"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";

export default function UserExperience() {
  const { language, isDarkMode } = useTheme(); // Access language and mode
  const [experience, setExperience] = useState("");

  useEffect(() => {
    fetchExperience();
  }, []);

  const fetchExperience = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-content/eyobwende18@gmail.com/experience");
      if (response.data.length > 0) {
        const fetchedContent = response.data[0].content || "";
        const translatedContent = translateContent(fetchedContent); // Translate the fetched content
        setExperience(translatedContent);
      }
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  // Translation function for dynamic content
  const translateContent = (text) => {
    const translations = {
      en: {
        "i am gaining experience in web development": "I am gaining experience in web development",
        "እኔ በድህረ-ገፅ ልምድ ላይ ነኝ": "I am gaining experience in web development",
        // Add more English-Amharic pairs as needed based on admin input
      },
      am: {
        "i am gaining experience in web development": "እኔ በድህረ-ገፅ ልምድ ላይ ነኝ",
        "እኔ በድህረ-ገፅ ልምድ ላይ ነኝ": "እኔ በድህረ-ገፅ ልምድ ላይ ነኝ",
        // Add more English-Amharic pairs as needed
      },
    };
    const normalizedText = text ? text.trim().toLowerCase() : text;
    const langTranslations = translations[language] || translations.en;
    for (const [key, value] of Object.entries(langTranslations)) {
      if (normalizedText === key.toLowerCase()) {
        return value;
      }
    }
    return text || ""; // Fallback to original text if no translation is found
  };

  // Translation object for static text
  const translations = {
    en: {
      title: "My Experience",
      defaultText: "No experience content available yet.",
    },
    am: {
      title: "የእኔ ልምድ",
      defaultText: "እስከ ነበር ምንም ልምድ ይዘት አልተገኘም።",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`p-6 max-w-4xl mx-auto ${isDarkMode ? "text-gray-200" : "text-gray-900"} transition-colors duration-300`}>
      <h1 className={`text-4xl font-bold mb-6 border-b-2 ${isDarkMode ? "border-blue-400" : "border-blue-500"} pb-2`}>{t.title}</h1>
      <div className={`bg-white rounded-xl shadow-lg p-6 border ${isDarkMode ? "dark:bg-gray-800 dark:border-gray-700" : "border-gray-200"} hover:shadow-xl transition-shadow duration-300`}>
        <p className="text-gray-700 leading-relaxed text-lg dark:text-gray-300">{experience || t.defaultText}</p>
      </div>
    </div>
  );
}