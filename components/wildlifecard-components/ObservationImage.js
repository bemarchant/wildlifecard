import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

let widthPhoto = Dimensions.get("window").width;
let heightPhoto = Dimensions.get("window").height;

const getPhotoBaseUrl = (urlPhoto) => {
  return urlPhoto.split("/photos/")[0] + "/photos/";
};

const getPhotoFileFormat = (urlPhoto) => {
  const len = urlPhoto.split(".").length;
  return urlPhoto.split(".")[len - 1];
};

const getPhotoImageUri = (observation) => {
  const photo_id = observation["photos"][0]["id"];
  const photoFileFormat = getPhotoFileFormat(observation["photos"][0]["url"]);
  const baseUrl = getPhotoBaseUrl(observation["photos"][0]["url"]);
  const image_uri = baseUrl + photo_id + "/original." + photoFileFormat;
  return image_uri;
};

export const ObservationImage = ({ observation }) => {
  widthPhoto = observation["photos"][0]["original_dimensions"]["width"];
  heightPhoto = observation["photos"][0]["original_dimensions"]["height"];
  const image_uri = getPhotoImageUri(observation);

  const imageScale = useSharedValue(1);
  const imagePosX = useSharedValue(0);
  const imagePosY = useSharedValue(0);
  const centerPinchX = useSharedValue(0);
  const centerPinchY = useSharedValue(0);

  const imageCenter = {
    x: widthPhoto / 2,
    y: heightPhoto / 2,
  };

  const pinchImage = Gesture.Pinch().onUpdate((gesture) => {
    imageScale.value = gesture.scale;
  });

  const panImage = Gesture.Pan().onUpdate((gesture) => {
    imagePosX.value = gesture.translationX;
    imagePosY.value = gesture.translationY;
  });

  const styleAnimated = useAnimatedStyle(() => ({
    transform: [
      { translateX: imagePosX.value + centerPinchX.value - imageCenter.x },
      { translateY: imagePosY.value + centerPinchY.value - imageCenter.y },
      { scale: imageScale.value },
      { translateX: imagePosX.value - centerPinchX.value + imageCenter.x },
      { translateY: imagePosY.value - centerPinchY.value + imageCenter.y },
    ],
  }));

  const composedGesture = Gesture.Simultaneous(pinchImage, panImage);

  return (
    <View>
      <GestureDetector gesture={composedGesture}>
        <Animated.Image
          style={styleAnimated}
          source={{
            uri: image_uri,
            width: widthPhoto,
            height: heightPhoto,
          }}
        />
      </GestureDetector>
    </View>
  );
};
