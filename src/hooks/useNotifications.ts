import notifee from "@notifee/react-native";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { Notification } from "../model/notification";

export default function useNotifications() {
  const [channelId, setChannelId] = useState<string>("");

  const setupNotifications = useCallback(async () => {
    if (Platform.OS === "android") {
      const id = await notifee.createChannel({
        id: "default",
        name: "Default Channel",
      });
      setChannelId(id);
    } else if (Platform.OS === "ios") {
      await notifee.requestPermission();
    }
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
    setupNotifications()
      .then(() => {
        console.debug("setupNotifications", "Done");
      })
      .catch((err) => {
        console.error("setupNotifications", err);
      });
  }, [setupNotifications]);

  return { sendLocalNotification };
}
