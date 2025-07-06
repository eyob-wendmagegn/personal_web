"use client";

import "../globals.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function UserLayout({ children }) {
  const { language, isDarkMode } = useTheme(); // Access language and mode
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleToggleMenu = (event) => {
    event.stopPropagation(); // Prevent the click from immediately triggering handleClickOutside
    setIsMenuOpen(!isMenuOpen);
  };

  // Translation object for navbar items
  const translations = {
    en: {
      home: "Home",
      about: "About Me",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact Me",
    },
    am: {
      home: "መነሻ",
      about: "ስለ እኔ",
      projects: "ፕሮጀክቶች",
      experience: "ልምድ",
      contact: "ይገናኝ",
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
              <a
                href="/user/home"
                className="hover:underline hover:text-orange-300 flex items-center"
              >
                <img src="/image6.jpg" alt="Logo" className="h-7 w-auto mr-2" />
                {t.home}
              </a>
              <div className="flex items-center space-x-4">
                <button
                  className="lg:hidden text-white focus:outline-none"
                  onClick={handleToggleMenu}
                  aria-label="Toggle menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                </button>
                <ul
                  className={`${
                    isMenuOpen ? "block" : "hidden"
                  } lg:flex lg:space-x-4 lg:ml-auto absolute lg:static top-16 right-0 mt-2 bg-gray-800 ${isDarkMode ? "dark:bg-gray-700" : ""} p-4 rounded-md lg:p-0 lg:bg-transparent`}
                >
                  <li>
                    <a
                      href="/user/about"
                      className="hover:underline hover:text-blue-500 block py-2 lg:inline-block"
                    >
                      {t.about}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/user/projects"
                      className="hover:underline hover:text-blue-500 block py-2 lg:inline-block"
                    >
                      {t.projects}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/user/experience"
                      className="hover:underline hover:text-blue-500 block py-2 lg:inline-block"
                    >
                      {t.experience}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/user/contact"
                      className="hover:underline hover:text-blue-500 block py-2 lg:inline-block"
                    >
                      {t.contact}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <main className="p-6 pt-24 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}