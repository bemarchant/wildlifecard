import { useState } from "react";
import * as React from "react";
import Svg, {
  Defs,
  Circle,
  LinearGradient,
  Stop,
  Path,
  Text,
  TSpan,
} from "react-native-svg";

let circleFillColor = "";
let circleX = 0;
let statusText = "";
let statusTextStrokeColor = "";
const ratio = 0.125;

const getConservationStatus = (circlePosX) => {
  if (circlePosX <= 0 * ratio * 120) {
    circleX = 0 * ratio * 120;
    circleFillColor = "#fff";
    statusTextStrokeColor = "#010007";
    return "NE";
  } else if (circlePosX > 0 * ratio * 120 && circlePosX <= 1 * ratio * 120) {
    circleX = 1 * ratio * 120;
    circleFillColor = "#9c9f9d";
    statusTextStrokeColor = "#010007";
    return "DD";
  } else if (circlePosX > 1 * ratio * 120 && circlePosX <= 2 * ratio * 120) {
    circleX = 2 * ratio * 120;
    circleFillColor = "#087465";
    statusTextStrokeColor = "#ffffffff";
    return "LC";
  } else if (circlePosX > 2 * ratio * 120 && circlePosX <= 3 * ratio * 120) {
    circleX = 3 * ratio * 120;
    circleFillColor = "#087465";
    statusTextStrokeColor = "#9bcc99ff";
    return "NT";
  } else if (circlePosX > 3 * ratio * 120 && circlePosX <= 4 * ratio * 120) {
    circleX = 4 * ratio * 120;
    circleFillColor = "#e19b00";
    statusTextStrokeColor = "#f7f0cdff";

    return "VU";
  } else if (circlePosX > 4 * ratio * 120 && circlePosX <= 5 * ratio * 120) {
    circleX = 5 * ratio * 120;
    circleFillColor = "#eb6209";
    statusTextStrokeColor = "#fbc79aff";

    return "EN";
  } else if (circlePosX > 5 * ratio * 120 && circlePosX <= 6 * ratio * 120) {
    circleX = 6 * ratio * 120;
    circleFillColor = "#e40521";
    statusTextStrokeColor = "#f8caceff";

    return "CR";
  } else if (circlePosX > 6 * ratio * 120 && circlePosX <= 7 * ratio * 120) {
    circleX = 7 * ratio * 120;
    circleFillColor = "#1a0046";
    statusTextStrokeColor = "#ffffffff";

    return "EW";
  } else if (circlePosX > 7 * ratio * 120) {
    circleX = 8 * ratio * 120;
    circleFillColor = "#010007";
    statusTextStrokeColor = "#e10613ff";

    return "EX";
  }
  return;
};
function ConservationStatusBar({ props, circlePosX }) {
  statusText = getConservationStatus(circlePosX);
  console.log(statusText);
  return (
    <Svg
      width="160mm"
      height="20mm"
      viewBox="-10 0 160 8"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="h"
          x1={20.927031}
          y1={356.59109}
          x2={36.562321}
          y2={356.59109}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-5.292 -356.59)"
        >
          <Stop offset={0} stopColor="#1a0046" stopOpacity={1} />
          <Stop offset={1} stopColor="#010007" stopOpacity={1} />
        </LinearGradient>
        <LinearGradient
          id="k"
          x1={99.102142}
          y1={356.59116}
          x2={114.73745}
          y2={356.59116}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-5.292 -352.682)"
        >
          <Stop offset={0} stopColor="#e40521" stopOpacity={1} />
          <Stop offset={1} stopColor="#1a0046" stopOpacity={1} />
        </LinearGradient>
        <LinearGradient
          id="j"
          x1={83.467178}
          y1={356.59106}
          x2={99.102478}
          y2={356.59106}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-5.292 -352.682)"
        >
          <Stop offset={0} stopColor="#eb6209" stopOpacity={1} />
          <Stop offset={1} stopColor="#e40521" stopOpacity={1} />
        </LinearGradient>
        <LinearGradient
          id="m"
          x1={67.832176}
          y1={356.59106}
          x2={83.467468}
          y2={356.59106}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-5.292 -352.682)"
        >
          <Stop offset={0} stopColor="#e19b00" stopOpacity={1} />
          <Stop offset={1} stopColor="#eb6209" stopOpacity={1} />
        </LinearGradient>
        <LinearGradient
          id="l"
          x1={52.197182}
          y1={356.59106}
          x2={67.832474}
          y2={356.59106}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-5.292 -352.682)"
        >
          <Stop offset={0} stopColor="#087465" stopOpacity={1} />
          <Stop offset={1} stopColor="#e19b00" stopOpacity={1} />
        </LinearGradient>
        <LinearGradient
          id="n"
          x1={20.926889}
          y1={356.59109}
          x2={36.56218}
          y2={356.59109}
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(-5.292 -352.682)"
        >
          <Stop offset={0} stopColor="#9c9f9d" stopOpacity={1} />
          <Stop offset={1} stopColor="#087465" stopOpacity={1} />
        </LinearGradient>
        <LinearGradient
          id="i"
          x1={5.2916598}
          y1={356.59109}
          x2={20.926889}
          y2={356.59109}
          gradientUnits="userSpaceOnUse"
          gradientTransform="matrix(1.00005 0 0 1.00005 -5.293 -352.7)"
        >
          <Stop offset={0} stopColor="#fff" stopOpacity={1} />
          <Stop offset={1} stopColor="#9c9f9d" stopOpacity={1} />
        </LinearGradient>
      </Defs>

      <Path
        d="M2.502 0A2.498 2.498 0 000 2.503v2.812a2.498 2.498 0 002.503 2.503h13.133V0z"
        fill="url(#i)"
        fillOpacity={1}
      />
      <Path
        d="M122.6 0a2.498 2.498 0 012.503 2.504v2.811a2.498 2.498 0 01-2.503 2.503h-13.132V0z"
        fill="url(#h)"
        fillOpacity={1}
      />
      <Path d="M93.81 0H78.176v7.818h15.636z" fill="url(#j)" fillOpacity={1} />
      <Path d="M109.446 0H93.81v7.818h15.636z" fill="url(#k)" fillOpacity={1} />
      <Path d="M62.54 0H46.906v7.818h15.636z" fill="url(#l)" fillOpacity={1} />
      <Path d="M78.176 0H62.54v7.818h15.636z" fill="url(#m)" fillOpacity={1} />
      <Path d="M46.906 0H31.27v7.818h15.636z" fill="#087465" fillOpacity={1} />
      <Path d="M31.27 0H15.635v7.818H31.27z" fill="url(#n)" fillOpacity={1} />

      <Circle
        r={8}
        cy={4}
        cx={circleX}
        fill={circleFillColor}
        fillOpacity={1}
        stroke="#454545"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray="none"
        strokeOpacity={1}
        paintOrder="markers stroke fill"
      />

      <Text
        stroke={statusTextStrokeColor}
        fontSize="6"
        x={circleX}
        y={6}
        textAnchor="middle"
      >
        {statusText}
      </Text>
    </Svg>
  );
}

export default ConservationStatusBar;
