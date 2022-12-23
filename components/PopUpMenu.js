import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Button,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

const SPRING_CONFIG = {
  damping: 60,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};
export const PopUpMenu = () => {
  const dimensions = useWindowDimensions();
  const top = useSharedValue(dimensions.height);
  const style = useAnimatedStyle(() => {
    return {
      top: withSpring(top.value, SPRING_CONFIG),
    };
  });
  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = top.value;
    },
    onActive(event, context) {
      top.value = context.startTop + event.translationY;
      if (top.value < dimensions.height / 2) {
        top.value = dimensions.height / 2;
      }
    },
    onEnd() {
      if (top.value > dimensions.height / 2 + 200) {
        top.value = dimensions.height;
      } else {
        top.value = dimensions.height / 2;
      }
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: "gray" }}>
      <Button
        title="Open Sheet"
        onPress={() => {
          top.value = withSpring(dimensions.height / 2, SPRING_CONFIG);
        }}
      ></Button>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.popUpMenu, style]}>
          <Text>This is a PopUpMenu</Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  popUpMenu: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
