import { Text } from "@react-navigation/elements";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import useNotifications from "../../hooks/useNotifications";

export function Inbox() {
  const { setupEventListeners } = useNotifications();

  useEffect(() => {
    setupEventListeners();
  }, [setupEventListeners]);

  return (
    <View style={styles.container}>
      <Text>Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
