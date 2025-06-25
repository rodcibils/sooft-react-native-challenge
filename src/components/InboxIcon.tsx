import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StyleSheet, Text, View } from "react-native";
import { useNotificationStore } from "../stores/useNotificationStore";

interface Props {
  color: string;
  size: number;
}

export default function InboxIcon(props: Props) {
  const { color, size } = props;
  const { unreadCount } = useNotificationStore();

  return (
    <View>
      <MaterialIcons name="inbox" size={size} color={color} />
      {unreadCount > 0 ? (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{unreadCount}</Text>
        </View>
      ) : null}
    </View>
  );
}

const BADGE_CONTAINER_SIZE = 18;
const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    width: BADGE_CONTAINER_SIZE,
    height: BADGE_CONTAINER_SIZE,
    borderRadius: BADGE_CONTAINER_SIZE,
    backgroundColor: "#ff0000",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
  },
});
