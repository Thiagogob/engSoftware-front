import { createContext, useState } from "react";

export const AnimalsContext = createContext();

export const AnimalsProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [apiCall, setApiCall] = useState(false);

  return <AnimalsContext.Provider value={{ animals, setAnimals, apiCall, setApiCall }}>{children}</AnimalsContext.Provider>;
};
