import { createContext } from "react";

export const AppContext = createContext();
const AppContextProvider = (prop) => {
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };
  const value = {
    calculateAge,
  };
  return (
    <AppContext.Provider value={value}>{prop.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
