"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";

export default function Home() {
  const { language, isDarkMode } = useTheme(); // Access language and mode
  const [content, setContent] = useState("I am Eyob Wendmagegn and I am learning at Woldia University as a developer");
  const [originalContent, setOriginalContent] = useState(""); // Store original fetched content
  const [animatedText, setAnimatedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Translation object for static text
  const translations = {
    en: {
      about: "About Me",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      aboutDesc: "Learn more about my journey and mission.",
      servicesDesc: "Explore the services I offer to my users.",
      projectsDesc: "Check out our latest completed projects.",
      contactDesc: "Get in touch with me for support.",
      portfolio: "Eyob's Portfolio",
      discover: "Discover my work and skills",
      animatedWords: ["Skills", "Website", "Well done", "Great!"],
    },
    am: {
      about: "ስለ እኔ",
      services: "አገልግሎቶች",
      projects: "ፕሮጀክቶች",
      contact: "ይገናኝ",
      aboutDesc: "ስለ ጉዞዬ እና ምርጫዬ ተገቢ መረጃ ይቀበሉ።",
      servicesDesc: "የተጠቃሚዎች ለአገልግሎቶችየተቀናጅ መረጃ ይፈልጉ።",
      projectsDesc: "የተጠናቀቁን አዲስ ፕሮጀክቶች ይመልከቱ።",
      contactDesc: "በድጋሚ የኔን አገናኝ ይቀበሉ።",
      portfolio: "የኢዮብ ፎሊዮ",
      discover: "ጸሀፊዬን ሥራ እና ችሎታዬ ለመመልከት",
      animatedWords: ["ችሎታዎች", "ድህረ-ገፅ", "በተጠንቀቅ የተሰጠ", "ጥሩ!"],
    },
  };

  const t = translations[language] || translations.en;
  const words = t.animatedWords; // Use translated animated words

  // Fetch content from API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-content/eyobwende18@gmail.com/home");
        if (response.data.length > 0) {
          const fetchedContent = response.data[0].content;
          setOriginalContent(fetchedContent); // Store original content
          const translatedContent = translateContent(fetchedContent);
          setContent(translatedContent); // Set translated content
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchContent();
  }, []);

  // Re-translate content when language changes
  useEffect(() => {
    if (originalContent) {
      const translatedContent = translateContent(originalContent);
      setContent(translatedContent);
    }
  }, [language, originalContent]);

  // Animation effect
  useEffect(() => {
    if (isAnimating) {
      const currentWord = words[wordIndex].split("");
      if (charIndex < currentWord.length) {
        const timer = setInterval(() => {
          setAnimatedText((prev) => prev + currentWord[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 300); // 300ms per character
        return () => clearInterval(timer);
      } else {
        const clearTimer = setTimeout(() => {
          setAnimatedText(""); // Clear the word
          setCharIndex(0); // Reset character index
          setWordIndex((prev) => (prev + 1) % words.length); // Loop back to 0 after last word
        }, 1000); // 1-second pause before clearing
        return () => clearTimeout(clearTimer);
      }
    }
  }, [wordIndex, charIndex, isAnimating, words]);

  // Translation function for dynamic content
  const translateContent = (text) => {
    const translations = {
      en: {
        "i am eyob wendmagegn and i am learning at woldia university as a developer":
          "I am Eyob Wendmagegn and I am learning at Woldia University as a developer",
        "እኔ ኤዮብ ወንደማገኝ ነኝ እና በዎልዲያ ዩኒቨርሲቲ እንደ ገንቢ እማማለም":
          "I am Eyob Wendmagegn and I am learning at Woldia University as a developer",
      },
      am: {
        "i am eyob wendmagegn and i am learning at woldia university as a developer":
          "እኔ ኤዮብ ወንደማገኝ ነኝ እና በዎልዲያ ዩኒቨርሲቲ እንደ ገንቢ እማማለም",
        "እኔ ኤዮብ ወንደማገኝ ነኝ እና በዎልዲያ ዩኒቨርሲቲ እንደ ገንቢ እማማለም":
          "እኔ ኤዮብ ወንደማገኝ ነኝ እና በዎልዲያ ዩኒቨርሲቲ እንደ ገንቢ እማማለም",
      },
    };
    const normalizedText = text ? text.trim().toLowerCase() : text;
    const langTranslations = translations[language] || translations.en;
    for (const [key, value] of Object.entries(langTranslations)) {
      if (normalizedText === key.toLowerCase()) {
        return value;
      }
    }
    return text || ""; // Fallback to original text or empty if no match
  };

  return (
    <div className={`p-11 max-w-7xl mx-auto ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"} transition-colors duration-300`}>
      <h2 className="text-2xl font-bold hover:text-blue-600 transition-colors duration-300 mb-6">
        {content}
      </h2>
      <div className="flex items-center gap-8 mb-6">
        <img
          src="/image5.jpg"
          alt="Profile Image"
          className="w-48 h-48 object-cover rounded-full border-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
        <div className={`bg-indigo-700 ${isDarkMode ? "border-indigo-600" : "border-indigo-300"} text-white p-1 rounded-md border-2 min-h-[80px] w-full max-w-xs`}>
          <h1 className="text-2xl font-bold text-left">
            {t.portfolio} <span className="animate-pulse text-yellow-300 inline-block">{animatedText}</span>
          </h1>
          <p className="text-md font-semibold mt-1 text-indigo-100">{t.discover}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`bg-white ${isDarkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"} p-6 rounded-lg shadow-md border`}>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.about}</h3>
          <p>{t.aboutDesc}</p>
        </div>
        <div className={`bg-white ${isDarkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"} p-6 rounded-lg shadow-md border`}>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.services}</h3>
          <p>{t.servicesDesc}</p>
        </div>
        <div className={`bg-white ${isDarkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"} p-6 rounded-lg shadow-md border`}>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.projects}</h3>
          <p>{t.projectsDesc}</p>
        </div>
        <div className={`bg-white ${isDarkMode ? "border-gray-700 text-gray-300" : "border-gray-200 text-gray-600"} p-6 rounded-lg shadow-md border`}>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{t.contact}</h3>
          <p>{t.contactDesc}</p>
        </div>
      </div>
    </div>
  );
}