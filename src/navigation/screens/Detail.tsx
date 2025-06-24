import { Text } from "@react-navigation/elements";
import { RouteProp, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import { RootStackParamList } from "..";

export default function Detail() {
  const route = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const { notification } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Notification Title: {notification.title}</Text>
    </View>
  );
}
