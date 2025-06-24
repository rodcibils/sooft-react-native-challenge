import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTheme } from "@react-navigation/native";
import { NotificationType } from "../model/notification";

interface Props {
  type: NotificationType;
  size: number;
}

export default function NotificationIcon(props: Props) {
  const { type, size } = props;
  const { colors } = useTheme();

  switch (type) {
    case NotificationType.INFO:
      return (
        <MaterialIcons name="info-outline" size={size} color={colors.text} />
      );
    case NotificationType.ERROR:
      return <MaterialIcons name="cancel" size={size} color={colors.text} />;
    case NotificationType.WARN:
      return (
        <MaterialIcons name="warning-amber" size={size} color={colors.text} />
      );
    default:
      return null;
  }
}
