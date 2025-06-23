import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  isChecked: boolean;
  onPress: () => void;
}

export default function Checkbox(props: Props) {
  const { isChecked, onPress, label } = props;
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {isChecked ? (
        <MaterialIcons
          name="check-box"
          size={CHECKBOX_SIZE}
          color={colors.primary}
        />
      ) : (
        <MaterialIcons
          name="check-box-outline-blank"
          size={CHECKBOX_SIZE}
          color={colors.primary}
        />
      )}
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const CHECKBOX_SIZE = 22;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginStart: 8,
  },
});
