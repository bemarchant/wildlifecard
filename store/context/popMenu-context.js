import { createContext, useState } from "react";

export const PopMenuContext = createContext({
  visibility: true,
  toggleVisibility: () => {},
  options: [],
  selectedOption: Object,
});

const PopMenuContextProvider = ({ children }) => {
  const [visibility, setVisibility] = useState(true);

  const value = {
    visibility: visibility,
    toggleVisibility: (isVisible) => {
      setVisibility(isVisible);
    },
  };

  return (
    <PopMenuContext.Provider value={value}>{children}</PopMenuContext.Provider>
  );
};

export default PopMenuContextProvider;
