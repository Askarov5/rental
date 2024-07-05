"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create a new context
const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchCriteria, setSearchCriteria] = useState({
    location: "",
    propertyType: "Any",
    bedrooms: "Any",
    bathrooms: "Any",
    rateMax: "Any",
    rateType: "Any",
  });

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount, searchCriteria, setSearchCriteria }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to use the GlobalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
