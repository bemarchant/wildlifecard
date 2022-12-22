import { Text, StyleSheet } from "react-native";

const CientificNameText = ({ children }) => {
  return (
    <Text style={styles.cientificNameText}>
      {"("}
      {children}
      {")"}
    </Text>
  );
};

export default CientificNameText;

const styles = StyleSheet.create({
  cientificNameText: {
    paddingBottom: 1,
    color: "white",
    fontSize: 16,
    fontWeight: "normal",
    fontStyle: "italic",
  },
});
