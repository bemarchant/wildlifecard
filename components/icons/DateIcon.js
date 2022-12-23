import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function DateIcon(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 3.1749999 3.175"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        r={1.4680769}
        cy={1.5875}
        cx={1.5875}
        display="inline"
        fill="none"
        fillOpacity={1}
        stroke="#fff"
        strokeWidth={0.238846}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="none"
        strokeOpacity={1}
        paintOrder="markers stroke fill"
      />
      <Path
        d="M1.587 1.587V.556M1.587 1.587l.997-.267"
        display="inline"
        fill="#fff"
        fillOpacity={1}
        stroke="#fff"
        strokeWidth={0.254}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="none"
        strokeOpacity={1}
        paintOrder="markers stroke fill"
      />
    </Svg>
  );
}

export default DateIcon;
