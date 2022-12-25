import { useState, useContext } from "react";
import { runOnJS } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import {
  Platform,
  Dimensions,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";

import { CientificName } from "./CientificName";
import { CommonName } from "./CommonName";
import { ConservationStatusBar } from "./ConservationStatusBar";
import { ClimbingZoneText } from "./ClimbingZoneText";
import { UserName } from "./UserName";
import { DateObservation } from "./DateObservation";
import { PopMenuContext } from "../../store/context/popMenu-context";

let windowWidth = Dimensions.get("window").width;
let windowHeight = Dimensions.get("window").height;

export const ObservationInfoBox = ({ observation }) => {
  const popMenuCtx = useContext(PopMenuContext);

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
  let userIconUrl = observation["user"]["icon_url"];
  return (
    <GestureDetector gesture={panCircleStatusBar}>
      <View style={[styles.infoContainer]}>
        <View style={styles.nameContainer}>
          <CommonName>{commonName}</CommonName>
          <Pressable
            onPress={() => {
              popMenuCtx.toggleVisibility(true);
            }}
          >
            <View style={styles.distributionContainer}>
              <Text style={styles.distributionText}> NAT </Text>
            </View>
          </Pressable>
        </View>

        <CientificName>{cientificName}</CientificName>
        <View style={styles.statusBar}>
          <ConservationStatusBar
            style={styles.statusBar}
            circlePosX={circlePosX}
          />
        </View>
        <ClimbingZoneText>{climbingZone}</ClimbingZoneText>
        <UserName userIconUrl={userIconUrl}>{userName}</UserName>
        <DateObservation>{date}</DateObservation>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    marginLeft: -10,
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

  nameContainer: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "green",
  },
  distributionContainer: {
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },

  distributionText: {
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 5,
    height: 12,
    width: 26,
    backgroundColor: "#f08546ff",
    paddingHorizontal: 1,
    fontSize: 8,
    color: "white",
    fontWeight: "bold",
    overflow: "hidden",
  },
});
