import { Text } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Notification } from "../model/notification";
import NotificationIcon from "./NotificationIcon";

interface Props {
  data: Notification;
  onPress: () => void;
}

export default function NotificationItem(props: Props) {
  const { data, onPress } = props;
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[{ backgroundColor: colors.card }, styles.container]}
      onPress={onPress}
    >
      <View style={styles.innerContainer}>
        <View style={styles.iconContainer}>
          <NotificationIcon type={data.type} size={ICON_SIZE} />
        </View>
        <View style={styles.dataContainer}>
          <Text
            style={[styles.title, { color: colors.primary }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {data.title}
          </Text>
          <Text style={styles.body} numberOfLines={1} ellipsizeMode="tail">
            {data.body}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            {new Date(data.timestampMs).toLocaleString()}
          </Text>
        </View>
        {data.isUnread ? (
          <View style={styles.unreadContainer}>
            <View
              style={[{ backgroundColor: colors.primary }, styles.unreadDot]}
            />
          </View>
        ) : null}
      </View>
      <View style={[{ backgroundColor: colors.border }, styles.separator]} />
    </TouchableOpacity>
  );
}

const ICON_SIZE = 36;
const UNREAD_DOT_SIZE = 16;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  body: {
    fontSize: 16,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    flex: 1,
    padding: 12,
  },
  iconContainer: {
    justifyContent: "center",
    marginRight: 12,
  },
  dataContainer: {
    flex: 1,
  },
  separator: {
    width: "100%",
    height: 1,
  },
  unreadContainer: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadDot: {
    width: UNREAD_DOT_SIZE,
    height: UNREAD_DOT_SIZE,
    borderRadius: UNREAD_DOT_SIZE,
  },
});
