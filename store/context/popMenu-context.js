import { createContext, useState } from "react";

export const PopMenuContext = createContext({
  visibility: true,
  toggleVisibility: () => {},
});

const PopMenuContextProvider = ({ children }) => {
  let visibility = true;

  const value = {
    visibility: visibility,
    toggleVisibility: (isVisible) => {
      visibility = isVisible;
      console.log("visibility : ", visibility);
    },
  };

  return (
    <PopMenuContext.Provider value={value}>{children}</PopMenuContext.Provider>
  );
};

export default PopMenuContextProvider;
