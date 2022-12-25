import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Button,
  Pressable,
  Dimensions,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import React, { useContext, useState, useEffect } from "react";
import { PopMenuContext } from "../store/context/popMenu-context";
import DistributionIcon from "./icons/DistributionIcon";

const SPRING_CONFIG = {
  damping: 60,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

let windowWidth = Dimensions.get("window").width;

export const PopUpMenu = ({ popMenu }) => {
  const popMenuCtx = useContext(PopMenuContext);

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
      if (top.value < dimensions.height * 0) {
        top.value = dimensions.height * 0;
      }
    },
    onEnd() {
      if (top.value > dimensions.height * 0 + 5) {
        top.value = dimensions.height;
        runOnJS(popMenuCtx.toggleVisibility)(false);
      } else {
        top.value = dimensions.height * 0;
      }
    },
  });
  if (popMenu) {
    console.log("boolean popMenu : ", popMenu);
    top.value = withSpring(dimensions.height * 0, SPRING_CONFIG);

    return (
      <View style={{ flex: 1 }}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.popUpMenu, style]}>
            <View style={styles.iconContainer}>
              <DistributionIcon></DistributionIcon>
            </View>
            <View style={styles.optionMenuContainer}>
              <Pressable>
                <View
                  style={[
                    styles.optionContainer,
                    { backgroundColor: "#df1b7cff" },
                  ]}
                >
                  <Text style={styles.optionText}>Introducida</Text>
                </View>
              </Pressable>
              <Pressable>
                <View
                  style={[
                    styles.optionContainer,
                    { backgroundColor: "#f08546ff" },
                  ]}
                >
                  <Text style={styles.optionText}>Nativa</Text>
                </View>
              </Pressable>
              <Pressable>
                <View
                  style={[
                    styles.optionContainer,
                    { backgroundColor: "#78aa1fff" },
                  ]}
                >
                  <Text style={styles.optionText}>Endémica</Text>
                </View>
              </Pressable>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  } else {
    console.log("boolean popMenu : ", popMenu);
    top.value = withSpring(dimensions.height, SPRING_CONFIG);
  }
  return;
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
    padding: 10,
    width: "100%",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    position: "absolute",
    top: -30,
    left: windowWidth / 2 - 45,
  },

  optionMenuContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    //backgroundColor: "red",
  },
  optionContainer: {
    top: 30,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 20,
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },

  optionText: {
    fontWeight: "bold",
    color: "white",
  },
});
