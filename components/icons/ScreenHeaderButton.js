import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ScreenHeaderButton = ({ name, color, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name={name} color={color} size={28} />
    </Pressable>
  );
};

export default ScreenHeaderButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
