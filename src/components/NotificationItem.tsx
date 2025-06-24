import { Text, TouchableOpacity } from "react-native";
import { Notification } from "../model/notification";

interface Props {
  data: Notification;
  onPress: () => void;
}

export default function NotificationItem(props: Props) {
  const { data, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{JSON.stringify(data)}</Text>
    </TouchableOpacity>
  );
}
