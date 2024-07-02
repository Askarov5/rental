"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create a new context
const GlobalContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const GlobalProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the session from the API
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();

        setSession(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSession();
  }, []);

  return (
    <GlobalContext.Provider value={{ session, unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Create a custom hook to use the GlobalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
