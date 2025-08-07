import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage first
    const savedMode = localStorage.getItem("darkMode");
    // If there's a value in localStorage, use it
    // Otherwise check for user's system preference
    return savedMode 
      ? JSON.parse(savedMode) 
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    // Update localStorage when dark mode changes
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    
    // Update the document with the appropriate class for dark mode
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode(mode => !mode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
