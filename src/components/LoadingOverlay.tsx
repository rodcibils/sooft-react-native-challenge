import { useTheme } from "@react-navigation/native";
import { ActivityIndicator, StyleSheet, View } from "react-native";

interface Props {
  visible: boolean;
}

export default function LoadingOverlay(props: Props) {
  const { visible } = props;
  const { colors } = useTheme();

  if (!visible) {
    return null;
  }

  return (
    <View style={styles.background}>
      <View
        style={[
          styles.spinnerContainer,
          {
            backgroundColor: colors.background,
            borderColor: colors.border,
          },
        ]}
      >
        <ActivityIndicator size={"large"} color={colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  spinnerContainer: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
