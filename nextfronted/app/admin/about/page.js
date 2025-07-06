'use client';

import { useTheme } from '../../../context/ThemeContext';
import { useState, useEffect } from 'react';

export default function AdminAbout() {
  const { language, isDarkMode } = useTheme(); // Access language and mode

  // Translation for static content
  const translations = {
    en: {
      title: 'About Me',
      para1: 'I am Eyob Wondmagegn, a passionate Computer Science student at Woldia University. As an aspiring website developer, I am dedicated to crafting innovative and user-friendly digital experiences. My journey in the tech world began with a curiosity for coding, which has grown into a deep interest in web development, where I explore technologies to build responsive and dynamic websites.',
      para2: 'At Woldia University, I am honing my skills in programming, problem-solving, and software design, with a focus on creating solutions that enhance accessibility and efficiency. Beyond academics, I enjoy experimenting with new frameworks and tools, contributing to projects that reflect my commitment to learning and growth in the field of technology.',
    },
    am: {
      title: 'ስለ እኔ',
      para1: 'እኔ ኤዮብ ወንድማገኝ ነኝ፣ በዎልዲያ ዩኒቨርሲቲ ውስጥ የኮምፒውተር ሳይንስ ተማሪ ነኝ። እንደ ድህረ-ገፅ ልማት ተማሪ ፣ እኔ የማይበተና እና ለተጠቃሚ ተመኩራኝ የበንጻብ ልምዶችን ለመፍጠር ተደራሽነት አለኝ። በቴክኖሎጂ ዓለም ውስጥ ጉዞዬ ከኮዶች መለዋወጥ ጋር ጀመረ፣ ይህም በድህረ-ገፅ ልማት ውስጥ ጥልቅ የመገበያ ያለ ዝና ለማድረግ ተጋብቷል፣ የተገናኝ እና የተለዋወጠ ድህረ-ገፆችን ለመፍጠር ቴክኖሎጂዎችን እመረምረዋለሁ።',
      para2: 'በወልዲያ ዩኒቨርሲቲ ውስጥ፣ ፕሮግራሚንግ፣ ችግር-የሚፈታ እና ሶፍትዌር ንጥረ-ጥበት ችሎቻዬን እጠብቃለሁ፣ ከዚያም ለመስራት እና አስፈላጊነት ያላቸው መፍትሄዎችን ለመፍጠር ላይ የተገነባ ጥናት አድርጌአለሁ። ከትምህርት በተጨማሪ፣ አዲስ ሙያዎችን እና መሣሪያዎችን መሞከር እወዳለሁ፣ የቴክኖሎጂ መስክ ውስጥ ለመማር እና ለመልካም ልምድ ያሳያዬን የሚያሳይ ፕሮጀክቶችን እገነባለሁ።',
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`p-6 max-w-7xl mx-auto ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <div className={`bg-${isDarkMode ? 'gray-800' : 'white'} rounded-xl shadow-xl overflow-hidden`}>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">{t.title}</h1>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src="/image3.jpg"
              alt={t.title}
              className={`w-auto h-64 object-contain rounded-lg border-4 ${isDarkMode ? 'border-gray-600' : 'border-blue-500'} shadow-lg hover:shadow-xl transition-shadow duration-300`}
            />
            <div className={`prose prose-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              <p>{t.para1}</p>
              <p>{t.para2}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}