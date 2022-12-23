import { useState } from "react";
import { runOnJS } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import {
  CientificName,
  CommonName,
  ConservationStatusBar,
  DateObservation,
  UserName,
} from "./";
let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;

export const ObservationInfoBox = ({ observation }) => {
  const [circlePosX, setCirclePosX] = useState(0);
  const panCircleStatusBar = Gesture.Pan().onUpdate((gesture) => {
    runOnJS(setCirclePosX)(gesture.translationX);
  });

  let day = observation["observed_on_details"]["day"] ?? "??";
  let month = observation["observed_on_details"]["month"] ?? "??";
  let year = observation["observed_on_details"]["year"] ?? "????";
  let date = day + "/" + month + "/" + year;
  let userName = observation["user"]["name"] ?? "Usuario desconocido";
  let climbingZone = "El Manzano" ?? "Desconocido";
  let cientificName = observation["taxon"]["name"] ?? "Sin nombre científico";
  let commonName =
    observation["taxon"]["preferred_common_name"] ?? "Sin nombre común";

  return (
    <GestureDetector gesture={panCircleStatusBar}>
      <View style={[styles.infoContainer]}>
        <CommonName>{commonName}</CommonName>
        <CientificName>{cientificName}</CientificName>
        <View style={styles.statusBar}>
          <ConservationStatusBar
            style={styles.statusBar}
            circlePosX={circlePosX}
          />
        </View>
        <Text style={styles.infoText}>{climbingZone}</Text>
        <UserName>{userName}</UserName>
        <DateObservation>{date}</DateObservation>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    marginLeft: -10,
  },

  infoText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    paddingVertical: 3,
  },

  infoContainer: {
    //backgroundColor: "green",
    position: "absolute",
    bottom: windowWidth * 0.06,
    left: windowHeight * 0.02,
  },

  headerIconsContainer: {
    padding: 0,
    flexDirection: "row",
  },

  textInput: {
    flex: 1,
  },
});
