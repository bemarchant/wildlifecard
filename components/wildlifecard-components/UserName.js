import { View, Text, StyleSheet } from "react-native";
import UserIcon from "../icons/UserIcon";

export const UserName = ({ children }) => {
  return (
    <View style={styles.rootView}>
      <View style={styles.iconContainer}>
        <UserIcon />
      </View>
      <Text style={styles.userNameText}>{children}</Text>
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

  userNameText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 3,
  },
});
