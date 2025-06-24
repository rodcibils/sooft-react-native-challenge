import { Text } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import NotificationItem from "../../components/NotificationItem";
import useNotifications from "../../hooks/useNotifications";
import { useNotificationStore } from "../../stores/useNotificationStore";

export function Inbox() {
  const navigation = useNavigation();
  const { setupEventListeners } = useNotifications();
  const { inbox } = useNotificationStore();

  useEffect(() => {
    setupEventListeners();
  }, [setupEventListeners]);

  return (
    <View style={styles.container}>
      {inbox.length > 0 ? (
        <FlatList
          style={styles.container}
          data={inbox}
          renderItem={({ item }) => (
            <NotificationItem
              data={item}
              onPress={() => {
                navigation.navigate("Detail", { notification: item });
              }}
            />
          )}
          /**
           * We're gonna assume that there cannot be multiple
           * notifications with the same timestamp - that would allow us to
           * use timestamp as identifier for notifications
           */
          keyExtractor={(item) => JSON.stringify(item.timestampMs)}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No notifications to display here yet
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    padding: 12,
  },
});
