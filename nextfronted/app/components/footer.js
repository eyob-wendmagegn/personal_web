"use client";

import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const { language } = useTheme();

  // Translation object for footer text
  const translations = {
    en: {
      copyright: "© {2025} Eyob Wendmagegn. All rights reserved.",
    },
    am: {
      copyright: "© {2025} እዮብ ወንድማገኝ ። መብቱ የተጠበቀ ነው።",
    },
  };

  const t = translations[language] || translations.en;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p dangerouslySetInnerHTML={{ __html: t.copyright.replace("{year}", currentYear) }} />
    </footer>
  );
}