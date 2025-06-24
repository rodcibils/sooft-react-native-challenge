import notifee, {
  AndroidNotificationSetting,
  AuthorizationStatus,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Notification, NotificationType } from "../model/notification";

function formatTitle(title: string, type: NotificationType): string {
  switch (type) {
    case NotificationType.WARN:
      return `⚠️ ${title}`;
    case NotificationType.ERROR:
      return `❌ ${title}`;
    case NotificationType.INFO:
      return `ℹ️ ${title}`;
    default:
      return title;
  }
}

export default function useNotifications() {
  const [channelId, setChannelId] = useState<string>("");

  const hasPermission = useCallback(async (): Promise<boolean> => {
    const settings = await notifee.getNotificationSettings();
    const arePermissionsGranted =
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;
    return arePermissionsGranted;
  }, []);

  const hasAlarmPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === "android") {
      const settings = await notifee.getNotificationSettings();
      return settings.android.alarm === AndroidNotificationSetting.ENABLED;
    }
    return true;
  }, []);

  const sendLocalNotification = useCallback(
    async (data: Notification, delaySec: number) => {
      if (delaySec > 0) {
        const trigger: TimestampTrigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: Date.now() + delaySec * 1000,
        };
        await notifee.createTriggerNotification(
          {
            title: formatTitle(data.title, data.type),
            body: data.body,
            android: {
              channelId,
              smallIcon: "ic_launcher",
              pressAction: {
                id: "default",
              },
            },
            data: {
              data: JSON.stringify(data),
            },
          },
          trigger
        );
      } else {
        await notifee.displayNotification({
          title: formatTitle(data.title, data.type),
          body: data.body,
          android: {
            channelId,
            smallIcon: "ic_launcher",
            pressAction: {
              id: "default",
            },
          },
          data: {
            data: JSON.stringify(data),
          },
        });
      }
    },
    [channelId]
  );

  const openAlarmSettings = useCallback(() => {
    notifee.openAlarmPermissionSettings().catch((err) => {
      console.error("openAlarmPermissionSettings", err);
    });
  }, []);

  useEffect(() => {
    const setupNotifications = async () => {
      await notifee.requestPermission();
      if (Platform.OS === "android") {
        const id = await notifee.createChannel({
          id: "default",
          name: "Default Channel",
        });
        setChannelId(id);
      }
    };
    setupNotifications()
      .then(() => {
        console.debug("setupNotifications", "Done");
      })
      .catch((err) => {
        console.error("setupNotifications", err);
      });
  }, []);

  return {
    sendLocalNotification,
    hasPermission,
    hasAlarmPermission,
    openAlarmSettings,
  };
}
