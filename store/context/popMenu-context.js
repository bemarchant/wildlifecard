import { createContext, useState } from "react";

export const PopMenuContext = createContext({
  visibility: true,
  toggleVisibility: () => {},
  options: [],
  selectedOption: Object,
  setOptions: () => {},
  setSelectedOption: () => {},
});

const PopMenuContextProvider = ({ children }) => {
  const [visibility, setVisibility] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(Object);

  const value = {
    visibility: visibility,
    toggleVisibility: (isVisible) => {
      setVisibility(isVisible);
    },
    options: options,
    setOptions: (options) => {
      setOptions(options);
    },
    selectedOption: Object,
    setSelectedOption: (option) => {
      console.log("popMenu-context : option : ", option);
      setSelectedOption(option);
      console.log("popMenu-context : selectedOption : ", selectedOption);
    },
  };

  return (
    <PopMenuContext.Provider value={value}>{children}</PopMenuContext.Provider>
  );
};

export default PopMenuContextProvider;
