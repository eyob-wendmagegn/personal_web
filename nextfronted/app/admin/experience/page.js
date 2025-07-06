'use client';

import { useTheme } from '../../../context/ThemeContext';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AdminExperience() {
  const { language, isDarkMode } = useTheme();
  const [experience, setExperience] = useState('');
  const [originalExperience, setOriginalExperience] = useState('');

  useEffect(() => {
    console.log('Current language:', language);
    console.log('Current experience:', experience);
  }, [language, experience]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/experience');
        if (response.data.length > 0) {
          const fetchedContent = response.data[0].content;
          console.log('Original content from API:', fetchedContent);
          setOriginalExperience(fetchedContent);
          const translatedContent = translateContent(fetchedContent);
          console.log('Translated content on fetch:', translatedContent);
          setExperience(translatedContent);
        } else {
          console.log('No content found in response');
        }
      } catch (error) {
        console.error('Error fetching experience:', error);
      }
    };
    fetchExperience();
  }, []);

  useEffect(() => {
    if (originalExperience) {
      const translatedContent = translateContent(originalExperience);
      console.log('Re-translated content on language change:', translatedContent);
      setExperience(translatedContent);
    }
  }, [language, originalExperience]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/save-content', {
        type: 'experience',
        content: experience,
        email: 'eyobwende18@gmail.com',
      });
      const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/experience');
      if (response.data.length > 0) {
        const fetchedContent = response.data[0].content;
        setOriginalExperience(fetchedContent);
        const translatedContent = translateContent(fetchedContent);
        setExperience(translatedContent);
      }
      alert('Experience updated successfully!');
    } catch (error) {
      console.error('Error updating experience:', error);
      alert('Failed to update experience!');
    }
  };

  const translateContent = (text) => {
    const translations = {
      en: {
        'i am eyob wendmagegn and i am a wolaita university student': 'i am eyob wendmagegn and i am a wolaita university student',
        'እኔ ኤዮብ ወንደማገኝ ነኝ እና የወላይታ ዩኒቨርሲቲ ተማሪ ነኝ': 'i am eyob wendmagegn and i am a wolaita university student',
      },
      am: {
        'i am eyob wendmagegn and i am a wolaita university student': 'እኔ ኤዮብ ወንደማገኝ ነኝ እና የወላይታ ዩኒቨርሲቲ ተማሪ ነኝ',
        'እኔ ኤዮብ ወንደማገኝ ነኝ እና የወላይታ ዩኒቨርሲቲ ተማሪ ነኝ': 'እኔ ኤዮብ ወንደማገኝ ነኝ እና የወላይታ ዩኒቨርሲቲ ተማሪ ነኝ',
      },
    };
    const normalizedText = text ? text.trim().toLowerCase() : text;
    const langTranslations = translations[language] || translations.en;
    for (const [key, value] of Object.entries(langTranslations)) {
      if (normalizedText === key.toLowerCase()) {
        return value;
      }
    }
    return text || '';
  };

  const translations = {
    en: { title: 'Admin Experience', placeholder: 'Write your experience here...', update: 'Update' },
    am: { title: 'የአስተዳደር ልምድ', placeholder: 'የእርስዎን ልምድ እናቀርብልኝ...', update: 'ዝውውር' },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} p-6 transition-colors duration-300`}>
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className={`w-full p-4 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[200px] ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'}`}
            placeholder={t.placeholder}
            rows="6"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {t.update}
          </button>
        </form>
      </div>
    </div>
  );
}