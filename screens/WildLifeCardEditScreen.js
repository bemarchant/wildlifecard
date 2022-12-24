import {
  useRef,
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import {
  Share,
  Dimensions,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { captureRef } from "react-native-view-shot";
import ScreenHeaderButton from "../components/icons/ScreenHeaderButton";
import {
  ObservationImage,
  ObservationInfoBox,
} from "../components/wildlifecard-components";
import { PopUpMenu } from "../components/PopUpMenu";
import {
  CLIMBING_ZONE,
  KINGDOM,
  WILD_LIFE_DATA,
  downLoadWildLifeData,
} from "../utils";
import { PopMenuContext } from "../store/context/popMenu-context";

const windowWidth = Dimensions.get("window").width;

export const WildLifeCardEditScreen = ({ navigation }) => {
  const popMenuCtx = useContext(PopMenuContext);
  let query1 = downLoadWildLifeData(CLIMBING_ZONE.elmanzano, KINGDOM.animalia);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.headerIconsContainer}>
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

  const [dummyState, setDummyState] = useState(0);
  useEffect(() => {
    setDummyState(dummyState + 1);
  }, [popMenuCtx.visibility]);

  if (query1.isLoading) {
    return;
  } else {
    const observation = WILD_LIFE_DATA.find((w) => w["taxaId"] === 1)["data"][
      "observations"
    ]["results"][4];
    console.log(
      "WildLifeCardEditScreen : popMenuCtx.visibility : ",
      popMenuCtx.visibility
    );
    if (popMenuCtx.visibility) {
      return (
        <KeyboardAvoidingView behavior="position" style={styles.rootView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.cardContainer} ref={viewRef}>
                <ObservationImage observation={observation} />
                <ObservationInfoBox observation={observation} />
              </View>
              <PopUpMenu popMenu={popMenuCtx.visibility} />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    } else {
      <KeyboardAvoidingView behavior="position" style={styles.rootView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.cardContainer} ref={viewRef}>
              <ObservationImage observation={observation} />
              <ObservationInfoBox observation={observation} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>;
    }
  }
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#454545ff",
  },
  cardContainer: {
    top: 10,
    backgroundColor: "#363636ff",
    overflow: "hidden",
    borderRadius: 5,
    height: windowWidth * 1.6,
    width: windowWidth * 0.9,
  },
});
