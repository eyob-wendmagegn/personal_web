'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children, initialTheme, initialLanguage }) {
  const [language, setLanguage] = useState(initialLanguage || 'en');
  const [isDarkMode, setIsDarkMode] = useState(initialTheme === 'dark');

  useEffect(() => {
    // Sync with localStorage on client side
    const savedLanguage = localStorage.getItem('language') || initialLanguage || 'en';
    const savedTheme = localStorage.getItem('theme') || initialTheme || 'light';
    setLanguage(savedLanguage);
    setIsDarkMode(savedTheme === 'dark');

    // Ensure DOM matches state immediately
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [initialLanguage, initialTheme]);

  useEffect(() => {
    // Persist changes to localStorage and apply to DOM
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [language, isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ language, setLanguage, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);