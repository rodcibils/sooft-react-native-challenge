import notifee, { AuthorizationStatus } from "@notifee/react-native";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Notification } from "../model/notification";

export default function useNotifications() {
  const [channelId, setChannelId] = useState<string>("");

  const hasPermission = useCallback(async () => {
    const settings = await notifee.getNotificationSettings();
    const arePermissionsGranted =
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;
    return arePermissionsGranted;
  }, []);

  const sendLocalNotification = useCallback(
    async (data: Notification) => {
      await notifee.displayNotification({
        title: data.title,
        body: data.body,
        android: {
          channelId,
          smallIcon: "ic_launcher",
          pressAction: {
            id: "default",
          },
        },
      });
    },
    [channelId]
  );

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

  return { sendLocalNotification, hasPermission };
}
