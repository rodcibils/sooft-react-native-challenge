import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Notification, NotificationType } from "../model/notification";

interface Props {
  data: Notification;
  onPress: () => void;
}

export default function NotificationItem(props: Props) {
  const { data, onPress } = props;
  const { colors } = useTheme();

  const getIcon = () => {
    switch (data.type) {
      case NotificationType.INFO:
        return (
          <MaterialIcons
            name="info-outline"
            size={ICON_SIZE}
            color={colors.text}
          />
        );
      case NotificationType.ERROR:
        return (
          <MaterialIcons name="cancel" size={ICON_SIZE} color={colors.text} />
        );
      case NotificationType.WARN:
        return (
          <MaterialIcons
            name="warning-amber"
            size={ICON_SIZE}
            color={colors.text}
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[{ backgroundColor: colors.card }, styles.container]}
      onPress={onPress}
    >
      <View style={styles.innerContainer}>
        <View style={styles.iconContainer}>{getIcon()}</View>
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
      </View>
      <View style={[{ backgroundColor: colors.border }, styles.separator]} />
    </TouchableOpacity>
  );
}

const ICON_SIZE = 36;
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
});
