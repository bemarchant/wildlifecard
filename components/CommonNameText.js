import { Text, StyleSheet } from "react-native";

const CommonNameText = ({ children }) => {
  return <Text style={styles.commonNameText}>{children}</Text>;
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
