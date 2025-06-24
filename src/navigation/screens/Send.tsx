import { Button, Text } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { useCallback } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import Checkbox from "../../components/Checkbox";
import LoadingOverlay from "../../components/LoadingOverlay";
import useNotifications from "../../hooks/useNotifications";
import { NotificationType } from "../../model/notification";
import { useNotificationFormStore } from "../../stores/useNotificationFormStore";
import { hasTitleAndBody } from "../../utils/notificationUtils";

export function Send() {
  const { colors } = useTheme();
  const {
    hasPermission,
    hasAlarmPermission,
    sendLocalNotification,
    openAlarmSettings,
  } = useNotifications();
  const {
    title,
    body,
    type,
    seconds,
    isLoading,
    setTitle,
    setBody,
    setType,
    setSeconds,
    setLoading,
    reset,
  } = useNotificationFormStore();

  const validateForm = useCallback((title: string, body: string): boolean => {
    if (!hasTitleAndBody(title, body)) {
      Alert.alert(
        "Title and body required",
        "Specify a title and a body in order to send a notification",
        [{ text: "Got it" }]
      );
      return false;
    }
    return true;
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!validateForm(title, body)) return;

    setLoading(true);

    try {
      const permissionsGranted = await hasPermission();
      if (!permissionsGranted) {
        Alert.alert(
          "Notifications Permissions Denied",
          "We need you to grant notifications permissions in order to be able to send notifications",
          [{ text: "Ok" }]
        );
        return;
      }

      if (seconds > 0) {
        const alarmPermissionsGranted = await hasAlarmPermission();
        if (!alarmPermissionsGranted) {
          Alert.alert(
            "Alarm Permissions Denied",
            "We need you to grant alarm permissions in order to schedule notifications",
            [
              {
                text: "Open Settings",
                onPress() {
                  openAlarmSettings();
                },
              },
              {
                text: "Close",
                style: "destructive",
              },
            ]
          );
          return;
        }
      }

      await sendLocalNotification(
        {
          title,
          body,
          type,
          timestampMs: Date.now() + seconds * 1000,
          isUnread: true,
        },
        seconds
      );
      console.debug("sendLocalNotification", "Done");
      reset();
    } catch (err) {
      console.error("sendLocalNotification", err);
      Alert.alert(
        "Error sending notification",
        "An unexpected error occurred when trying to send the notification",
        [{ text: "Close" }]
      );
    } finally {
      setLoading(false);
    }
  }, [
    validateForm,
    title,
    body,
    setLoading,
    hasPermission,
    seconds,
    sendLocalNotification,
    type,
    reset,
    hasAlarmPermission,
    openAlarmSettings,
  ]);

  return (
    <>
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
        <View>
          {Object.values(NotificationType).map((t) => (
            <Checkbox
              key={t}
              label={t}
              isChecked={t === type}
              onPress={() => setType(t)}
            />
          ))}
        </View>

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
          <Button onPress={handleSubmit}>Send Local Notification</Button>
        </View>
      </KeyboardAvoidingView>
      <LoadingOverlay visible={isLoading} />
    </>
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
