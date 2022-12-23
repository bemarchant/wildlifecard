import { View, Text, StyleSheet } from "react-native";
import DateIcon from "../icons/DateIcon";

export const DateObservation = ({ children }) => {
  return (
    <View style={styles.rootView}>
      <View style={styles.iconContainer}>
        <DateIcon />
      </View>
      <Text style={styles.dateObservationText}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "blue",
  },
  iconContainer: {
    justifyContent: "center",
    marginRight: 6,
    //backgroundColor: "red",
  },

  dateObservationText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 3,
  },
});
