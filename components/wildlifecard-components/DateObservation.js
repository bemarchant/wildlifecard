import { Text, StyleSheet } from "react-native";

export const DateObservation = ({ children }) => {
  return <Text style={styles.dateObservationText}>{children}</Text>;
};

const styles = StyleSheet.create({
  dateObservationText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 3,
  },
});
