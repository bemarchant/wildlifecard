import { useRef, useLayoutEffect } from "react";
import { Share, Text, Image, Dimensions, View, StyleSheet } from "react-native";
import { captureRef } from "react-native-view-shot";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import ScreenHeaderButton from "./icons/ScreenHeaderButton";
import ConservationStatusBar from "./svg/ConservationStatusBar";
import CientificNameText from "./CientificNameText";
import CommonNameText from "./CommonNameText";
import { CLIMBING_ZONE, KINGDOM } from "../utils/constants";
import { downLoadWildLifeData } from "../utils/inat";
import { WILD_LIFE_DATA } from "../utils/constants";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const WildLifeCard = ({ navigation }) => {
  const imageScale = useSharedValue(1);
  const imagePosX = useSharedValue(0);
  const imagePosY = useSharedValue(0);

  const pinchImage = Gesture.Pinch().onUpdate((gesture) => {
    imageScale.value = gesture.scale;
  });

  const panImage = Gesture.Pan().onUpdate((gesture) => {
    imagePosX.value = gesture.translationX;
    imagePosY.value = gesture.translationY;
  });

  const styleAnimated = useAnimatedStyle(() => ({
    transform: [
      { scale: imageScale.value },
      { translateX: imagePosX.value },
      { translateY: imagePosY.value },
    ],
  }));

  const composed = Gesture.Simultaneous(pinchImage, panImage);

  const viewRef = useRef();

  const shareWildLifeCard = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 1,
      });
      await Share.share({ url: uri });
    } catch (err) {
      console.error(err);
    }
  };

  const editWildLifeCard = () => {
    return;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerIconsContainer}>
            <ScreenHeaderButton
              name="brush-outline"
              color="white"
              onPress={editWildLifeCard}
            />
            <ScreenHeaderButton
              name="share-outline"
              color="white"
              onPress={shareWildLifeCard}
            />
          </View>
        );
      },
    });
  });

  let query1 = downLoadWildLifeData(CLIMBING_ZONE.elmanzano, KINGDOM.animalia);

  if (query1.isLoading) {
    return;
  } else {
    const observation = WILD_LIFE_DATA.find((w) => w["taxaId"] === 1)["data"][
      "observations"
    ]["results"][12];

    let day = getObservationDay(observation);
    let month = getObservationMonth(observation);
    let year = getObservationYear(observation);
    let date = day + "/" + month + "/" + year;
    let userName = getObservationUserName(observation);
    let climbingZone = "El Manzano" ?? "Desconocido";
    let communName = getObservationCommonName(observation);
    let cientificName = getObservationCientificName(observation);
    let image_uri = getPhotoImageUri(observation);
    let widthPhoto = observation["photos"][0]["original_dimensions"]["width"];
    let heightPhoto = observation["photos"][0]["original_dimensions"]["height"];

    return (
      <View style={styles.rootView}>
        <View style={styles.imageContainer} ref={viewRef}>
          <GestureDetector gesture={composed}>
            <Animated.Image
              style={styleAnimated}
              source={{
                uri: image_uri,
                width: widthPhoto,
                height: heightPhoto,
              }}
            />
          </GestureDetector>

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
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "red",
    overflow: "hidden",
    borderRadius: 20,
    height: "90%",
    width: "90%",
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
    bottom: windowWidth * 0.06,
    left: windowHeight * 0.02,
  },

  headerIconsContainer: {
    padding: 0,
    flexDirection: "row",
  },
});

const getPhotoImageUri = (observation) => {
  const photo_id = observation["photos"][0]["id"];
  const photoFileFormat = getPhotoFileFormat(observation["photos"][0]["url"]);
  const baseUrl = getPhotoBaseUrl(observation["photos"][0]["url"]);
  const image_uri = baseUrl + photo_id + "/original." + photoFileFormat;
  console.log(observation["photos"][0]["original_dimensions"]["height"]);
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
