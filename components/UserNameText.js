import { Text, StyleSheet } from "react-native";

const UserNameText = ({ children }) => {
  return <Text style={styles.userNameText}>{children}</Text>;
};

export default UserNameText;

const styles = StyleSheet.create({
  userNameText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 3,
  },
});
