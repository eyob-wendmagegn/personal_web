"use client";

import "../globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import ChangePassword from "../components/changePassword";
import Logout from "../components/logout";
import Help from "../components/help";

export default function UserLayout({ children }) {
  const { language, isDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest("nav")) {
        setIsMenuOpen(false);
      }
      if (isDropdownOpen && !event.target.closest(".dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen, isDropdownOpen]);

  const handleToggleMenu = (event) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleToggleDropdown = (event) => {
    event.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseModals = () => {
    setShowChangePassword(false);
    setShowHelp(false);
    setIsDropdownOpen(false);
  };

  const translations = {
    en: {
      home: "Home",
      about: "About Me",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact Me",
      changePassword: "Change Password",
      help: "Help",
      logout: "Logout",
    },
    am: {
      home: "መነሻ",
      about: "ስለ እኔ",
      projects: "ፕሮጀክቶች",
      experience: "ልምድ",
      contact: "ይገናኝ",
      changePassword: "የይለፍ ቃልን ቀይር",
      help: "ርዳታ",
      logout: "ውጣ",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <html lang={language || "en"}>
      <body className={`bg-gray-100 text-gray-900 min-h-screen flex flex-col ${isDarkMode ? "dark:bg-gray-900 dark:text-gray-200" : ""} transition-colors duration-300`}>
        <Header title="Eyob Wendmagegn Portfolio" />
        <nav className={`bg-gray-800 ${isDarkMode ? "dark:bg-gray-700" : ""} text-white fixed top-16 left-0 w-full z-40 shadow-md`}>
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <a href="/user/home" className="hover:underline hover:text-orange-300 flex items-center">
                <img src="/image6.jpg" alt="Logo" className="h-7 w-auto mr-2" />
                {t.home}
              </a>
              <div className="flex items-center space-x-4">
                <button className="lg:hidden text-white focus:outline-none" onClick={handleToggleMenu} aria-label="Toggle menu">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                </button>
                <ul className={`${isMenuOpen ? "block" : "hidden"} lg:flex lg:space-x-4 lg:ml-auto absolute lg:static top-16 right-0 mt-2 bg-gray-800 ${isDarkMode ? "dark:bg-gray-700" : ""} p-4 rounded-md lg:p-0 lg:bg-transparent`}>
                  <li>
                    <a href="/user/about" className="hover:underline hover:text-blue-500 block py-2 lg:inline-block">{t.about}</a>
                  </li>
                  <li>
                    <a href="/user/projects" className="hover:underline hover:text-blue-500 block py-2 lg:inline-block">{t.projects}</a>
                  </li>
                  <li>
                    <a href="/user/experience" className="hover:underline hover:text-blue-500 block py-2 lg:inline-block">{t.experience}</a>
                  </li>
                  <li>
                    <a href="/user/contact" className="hover:underline hover:text-blue-500 block py-2 lg:inline-block">{t.contact}</a>
                  </li>
                </ul>
                {/* Move three-dot icon outside ul to be always visible */}
                <div className="relative dropdown">
                  <button onClick={handleToggleDropdown} className="focus:outline-none">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-gray-700 dark:bg-gray-600 rounded-md shadow-lg py-2 z-50">
                      <li>
                        <button onClick={() => { setShowChangePassword(true); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600">
                          {t.changePassword}
                        </button>
                      </li>
                      <li>
                        <button onClick={() => { setShowHelp(true); setIsDropdownOpen(false); }} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-600">
                          {t.help}
                        </button>
                      </li>
                      <li>
                        <Logout onClose={() => setIsDropdownOpen(false)} />
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main className="p-6 pt-24 flex-grow">{children}</main>
        <Footer />
        {showChangePassword && <ChangePassword onClose={handleCloseModals} />}
        {showHelp && <Help onClose={handleCloseModals} />}
      </body>
    </html>
  );
}