import { Button, Text } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { NotificationType } from "../../model/notification";
import { useNotificationFormStore } from "../../stores/useNotificationFormStore";

export function Send() {
  const { colors } = useTheme();
  const {
    title,
    body,
    type,
    seconds,
    setTitle,
    setBody,
    setType,
    setSeconds,
    reset,
  } = useNotificationFormStore();

  const handleSendNotification = () => {
    // TODO: Trigger local push notification using `title`, `body`, `type`, and `delayInSeconds`
    console.log({ title, body, type, seconds });

    reset();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.label}>Notification Title</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.border, color: colors.text },
        ]}
        placeholder="Enter title"
        placeholderTextColor={colors.border}
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
        placeholderTextColor={colors.border}
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
        placeholderTextColor={colors.border}
        value={type}
        onChangeText={(text) => {
          const sanitized = text.toLowerCase();
          if (["info", "warning", "error"].includes(sanitized)) {
            setType(sanitized as typeof type);
          } else {
            setType(NotificationType.INFO);
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
        placeholderTextColor={colors.border}
        keyboardType="numeric"
        value={seconds.toString()}
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
    </KeyboardAvoidingView>
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
