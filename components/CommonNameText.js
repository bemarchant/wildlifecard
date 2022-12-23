import { Text, TextInput, StyleSheet } from "react-native";

const CommonNameText = ({ children }) => {
  return <TextInput style={styles.commonNameText}>{children}</TextInput>;
};

export default CommonNameText;

const styles = StyleSheet.create({
  commonNameText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "normal",
    paddingVertical: 1,
  },
});
