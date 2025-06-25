import notifee, {
  AndroidNotificationSetting,
  AuthorizationStatus,
  EventType,
  Notification,
  TimestampTrigger,
  TriggerType,
} from "@notifee/react-native";
import { useCallback, useEffect } from "react";
import { Platform } from "react-native";
import {
  Notification as NotificationModel,
  NotificationType,
} from "../model/notification";
import { useNotificationStore } from "../stores/useNotificationStore";

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

function extractData(
  notification: Notification | undefined
): NotificationModel | undefined {
  const strData = notification?.data?.data;
  let data: NotificationModel | undefined;
  if (strData !== undefined && typeof strData === "string") {
    data = JSON.parse(strData);
  }
  return data;
}

export default function useNotifications() {
  const { channelId, setChannelId, addToInbox, unreadCount } =
    useNotificationStore();

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

  const setupEventListeners = useCallback(
    (onPress: (notification: NotificationModel) => void) => {
      notifee.onForegroundEvent((event) => {
        const { type, detail } = event;
        const data = extractData(detail.notification);
        if (data === undefined) {
          return;
        }
        switch (type) {
          case EventType.DELIVERED:
            addToInbox(data);
            break;
          case EventType.PRESS:
            onPress(data);
            break;
          default:
            break;
        }
        notifee.onBackgroundEvent(async (event) => {
          const { type, detail } = event;
          const data = extractData(detail.notification);
          if (data === undefined) {
            return;
          }
          switch (type) {
            case EventType.DELIVERED:
              addToInbox(data);
              break;
            case EventType.PRESS:
              onPress(data);
              break;
            default:
              break;
          }
        });
      });
    },
    [addToInbox]
  );

  const sendLocalNotification = useCallback(
    async (data: NotificationModel, delaySec: number) => {
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
  }, [setChannelId]);

  useEffect(() => {
    notifee.setBadgeCount(unreadCount).catch((err) => {
      console.error("setBadgeCount", err);
    });
  }, [unreadCount]);

  return {
    sendLocalNotification,
    hasPermission,
    hasAlarmPermission,
    openAlarmSettings,
    setupEventListeners,
  };
}
