"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";

export default function Projects() {
  const { language, isDarkMode } = useTheme(); // Access language and mode
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-content/eyobwende18@gmail.com/projects");
      const translatedProjects = response.data.map((project) => ({
        ...project,
        title: translateContent(project.title),
        explanation: translateContent(project.explanation),
      }));
      setProjects(translatedProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Translation function for dynamic content
  const translateContent = (text) => {
    const translations = {
      en: {
        "portfolio website": "Portfolio Website",
        "ፎሊዮ ድህረ-ገፅ": "Portfolio Website",
        "e-commerce platform": "E-commerce Platform",
        "ኢ-ንግዳ ፕላትፎርም": "E-commerce Platform",
        // Add more title/explanation pairs as needed based on admin input
      },
      am: {
        "portfolio website": "ፎሊዮ ድህረ-ገፅ",
        "ፎሊዮ ድህረ-ገፅ": "ፎሊዮ ድህረ-ገፅ",
        "e-commerce platform": "ኢ-ንግዳ ፕላትፎርም",
        "ኢ-ንግዳ ፕላትፎርም": "ኢ-ንግዳ ፕላትፎርም",
        // Add more title/explanation pairs as needed
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
      title: "My Projects",
    },
    am: {
      title: "የእኔ ፕሮጀክቶች",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`p-6 max-w-7xl mx-auto ${isDarkMode ? "text-gray-200" : "text-gray-900"} transition-colors duration-300`}>
      <h1 className={`text-3xl font-bold mb-6 ${isDarkMode ? "border-blue-400" : "border-blue-500"} border-b-2 pb-2`}>{t.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className={`bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border ${isDarkMode ? "dark:bg-gray-800 dark:border-gray-700" : "border-gray-200 hover:border-blue-300"}`}>
            <h3 className={`text-xl font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-800"} mb-2`}>{project.title}</h3>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={`text-blue-500 hover:underline mb-2 block ${isDarkMode ? "dark:text-blue-300" : ""}`}>
              {project.link}
            </a>
            <p className={`text-gray-600 ${isDarkMode ? "dark:text-gray-400" : ""}`}>{project.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}