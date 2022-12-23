import { Text, StyleSheet } from "react-native";

const DateObservationText = ({ children }) => {
  return <Text style={styles.dateObservationText}>{children}</Text>;
};

export default DateObservationText;

const styles = StyleSheet.create({
  dateObservationText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 3,
  },
});
