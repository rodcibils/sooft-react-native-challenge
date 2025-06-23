import notifee from "@notifee/react-native";
import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";

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

  const sendLocalNotification = useCallback(() => {
    /**
     * TODO
     */
  }, []);

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
