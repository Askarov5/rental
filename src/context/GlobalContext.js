"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create a new context
const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to use the GlobalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
