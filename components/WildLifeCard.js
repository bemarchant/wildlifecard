import { useRef, useLayoutEffect } from "react";
import { Text, Image, Dimensions, View, StyleSheet } from "react-native";
import ScreenHeaderButton from "./icons/ScreenHeaderButton";
import ConservationStatusBar from "./svg/ConservationStatusBar";
import CientificNameText from "./CientificNameText";
import CommonNameText from "./CommonNameText";
import { CLIMBING_ZONE, KINGDOM } from "../utils/constants";
import { downLoadWildLifeData } from "../utils/inat";
import { WILD_LIFE_DATA } from "../utils/constants";
import { captureRef } from "react-native-view-shot";
import { Share } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const saveToCameraRoll = () => {
  return;
};
export const WildLifeCard = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <ScreenHeaderButton
            name="arrow-down-circle-outline"
            color="white"
            onPress={saveToCameraRoll}
          />
        );
      },
    });
  });
  //   const viewRef = useRef();
  //   const shareDummyImage = async () => {
  //     try {
  //       const uri = await captureRef(viewRef, {
  //         format: "png",
  //         quality: 0.7,
  //       });
  //       await Share.open({ url: uri });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  let query1 = downLoadWildLifeData(CLIMBING_ZONE.elmanzano, KINGDOM.animalia);

  if (query1.isLoading) {
    return;
  } else {
    const observation = WILD_LIFE_DATA.find((w) => w["taxaId"] === 1)["data"][
      "observations"
    ]["results"][26];

    let day = getObservationDay(observation);
    let month = getObservationMonth(observation);
    let year = getObservationYear(observation);
    let date = day + "/" + month + "/" + year;
    let userName = getObservationUserName(observation);
    let climbingZone = "El Manzano" ?? "Desconocido";
    let communName = getObservationCommonName(observation);
    let cientificName = getObservationCientificName(observation);
    let image_uri = getPhotoImageUri(observation);

    return (
      //   <View style={styles.rootView} ref={viewRef}>
      <View style={styles.rootView}>
        <View style={styles.imageContainer}>
          <Image
            style={{
              borderRadius: 20,
            }}
            source={{
              uri: image_uri,
              width: windowWidth,
              height: windowHeight,
            }}
          ></Image>
          <View style={[styles.infoContainer]}>
            <CommonNameText>{communName}</CommonNameText>
            <CientificNameText>{cientificName}</CientificNameText>
            <ConservationStatusBar consevationStatus={""} height={12} />
            <Text style={styles.infoText}>{climbingZone}</Text>
            <Text style={styles.infoText}>{userName}</Text>
            <Text style={styles.infoText}>{date}</Text>
          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
  },

  infoText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    padding: 3,
  },

  infoContainer: {
    //backgroundColor: "green",
    position: "absolute",
    bottom: windowWidth * 0.1,
    left: windowHeight * 0.02,
  },
});

const getPhotoImageUri = (observation) => {
  const photo_id = observation["photos"][0]["id"];
  const photoFileFormat = getPhotoFileFormat(observation["photos"][0]["url"]);
  const baseUrl = getPhotoBaseUrl(observation["photos"][0]["url"]);
  const image_uri = baseUrl + photo_id + "/original." + photoFileFormat;

  return image_uri;
};

const getPhotoBaseUrl = (urlPhoto) => {
  return urlPhoto.split("/photos/")[0] + "/photos/";
};
const getPhotoFileFormat = (urlPhoto) => {
  const len = urlPhoto.split(".").length;
  return urlPhoto.split(".")[len - 1];
};

const getObservationDay = (observation) => {
  return observation["observed_on_details"]["day"] ?? "??";
};
const getObservationMonth = (observation) => {
  return observation["observed_on_details"]["month"] ?? "??";
};
const getObservationYear = (observation) => {
  return observation["observed_on_details"]["year"] ?? "????";
};

const getObservationUserName = (observation) => {
  return observation["user"]["name"] ?? "Usuario desconocido";
};

const getObservationCommonName = (observation) => {
  return observation["taxon"]["preferred_common_name"] ?? "Sin nombre común";
};
const getObservationCientificName = (observation) => {
  return observation["taxon"]["name"] ?? "Sin nombre científico";
};
