import { Text, StyleSheet } from "react-native";

export const UserName = ({ children }) => {
  return <Text style={styles.userNameText}>{children}</Text>;
};

const styles = StyleSheet.create({
  userNameText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 3,
  },
});
