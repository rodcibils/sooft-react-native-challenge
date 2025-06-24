import { Text } from "@react-navigation/elements";
import { RouteProp, useRoute, useTheme } from "@react-navigation/native";
import { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RootStackParamList } from "..";
import NotificationIcon from "../../components/NotificationIcon";
import { useNotificationStore } from "../../stores/useNotificationStore";

export default function Detail() {
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const { notification } = route.params;
  const { colors } = useTheme();
  const { markAsRead } = useNotificationStore();

  useEffect(() => {
    if (notification.isUnread) {
      markAsRead(notification.timestampMs);
    }
  }, [markAsRead, notification.isUnread, notification.timestampMs]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <NotificationIcon type={notification.type} size={ICON_SIZE} />
      <Text style={[styles.title, { color: colors.primary }]}>
        {notification.title}
      </Text>
      <Text style={styles.body}>{notification.body}</Text>
      <Text style={styles.timestamp}>{`Notified at ${new Date(
        notification.timestampMs
      ).toLocaleString()}`}</Text>
    </ScrollView>
  );
}

const ICON_SIZE = 64;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  contentContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  body: {
    fontSize: 18,
    textAlign: "center",
  },
  timestamp: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 12,
  },
});
