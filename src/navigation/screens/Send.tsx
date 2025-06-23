import { Button, Text } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

export function Send() {
  const { colors } = useTheme();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [type, setType] = useState<"info" | "warning" | "error">("info");
  const [seconds, setSeconds] = useState("");

  const handleSendNotification = () => {
    const delayInSeconds = Math.max(0, parseInt(seconds) || 0);

    // TODO: Trigger local push notification using `title`, `body`, `type`, and `delayInSeconds`
    console.log({ title, body, type, delayInSeconds });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Notification Title</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Notification Body</Text>
      <TextInput
        style={[
          styles.input,
          styles.multilineInput,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Enter body text"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Text style={styles.label}>Notification Type</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="info | warning | error"
        value={type}
        onChangeText={(text) => {
          const sanitized = text.toLowerCase();
          if (["info", "warning", "error"].includes(sanitized)) {
            setType(sanitized as typeof type);
          } else {
            setType("info");
          }
        }}
      />
      <Text style={styles.label}>Seconds Delay</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Enter seconds - Now if missing"
        keyboardType="numeric"
        value={seconds}
        onChangeText={(text) => {
          const numeric = text.replace(/[^0-9]/g, "");
          setSeconds(numeric);
        }}
      />
      <View style={styles.buttonWrapper}>
        <Button onPress={handleSendNotification}>
          Send Local Notification
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  buttonWrapper: {
    marginTop: 24,
  },
});
