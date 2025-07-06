"use client";

import { useTheme } from "../../../context/ThemeContext";

export default function About() {
  const { language, isDarkMode } = useTheme(); // Access language and mode

  // Translation object for static text
  const translations = {
    en: {
      title: "About Me",
      intro: "I am Eyob Wondmagegn, a passionate Computer Science student at Woldia University. As an aspiring website developer, I am dedicated to crafting innovative and user-friendly digital experiences. My journey in the tech world began with a curiosity for coding, which has grown into a deep interest in web development, where I explore technologies to build responsive and dynamic websites.",
      skills: "At Woldia University, I am honing my skills in programming, problem-solving, and software design, with a focus on creating solutions that enhance accessibility and efficiency. Beyond academics, I enjoy experimenting with new frameworks and tools, contributing to projects that reflect my commitment to learning and growth in the field of technology.",
    },
    am: {
      title: "ስለ እኔ",
      intro: "እኔ እዮብ ወንደማገኝ ነኝ፣ በወልዲያ ዩኒቨርሲቲ ውስጥ የኮምፒውተር ሳይንስ ተማሪ ነኝ። እንደ ድህረ-ገፅ ገንቢ ተስፋ ያለኝ እና አዲስ እና ተጠቃሚዎችን ያዳብር የበጀት ተሽከርካሪ ልፍጠር ተስፋ አለኝ። በቴክኖሎጂ አለም ውስጥ ጉዞዬ ከኮድ መፍጠር ያለ እቅድ ይጀምራል፣ ይህም በድህረ-ገፅ ልምድ ውስጥ ጥልቅ ጥናት ወደ መውጣት ልዩ ቴክኖሎጂዎችን ለመፍጠር ተገቢ እና የተለዋወጠ ድህረ-ገፅ መፍጠር እፈልጋለሁ።",
      skills: "በወልዲያ ዩኒቨርሲቲ ውስጥ ፕሮግራምምን፣ እቃ መፍቻ እና የሶፍትዌር ንድፍ ችሎታዎቼን እጠብቃለሁ፣ በተግባራትና በአገልግሎት ላይ ያኖርበት መፍትሄዎችን ለመፍጠር እሰራለሁ። ከትምህርት ውጭ አዲስ ክፍልዎች መሞከር እወዳለሁ፣ በቴክኖሎጂ ዓላማ ለመማር እና ለመልካም ልምድ ያሳይ ፕሮጀክቶችን እፈጥራለሁ።",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`p-6 max-w-7xl mx-auto ${isDarkMode ? "text-gray-200" : "text-gray-800"} transition-colors duration-300`}>
      <div className={`bg-white rounded-xl shadow-xl overflow-hidden ${isDarkMode ? "dark:bg-gray-800" : ""}`}>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="/image2.jpg"
              alt="Eyob Wondmagegn"
              className="w-auto h-64 object-contain rounded-lg border-4 border-blue-500 shadow-lg hover:shadow-xl transition-shadow duration-300"
            />
            <div className="prose prose-lg">
              <p>{t.intro}</p>
              <p>{t.skills}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}