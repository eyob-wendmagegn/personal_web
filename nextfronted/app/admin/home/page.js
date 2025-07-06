"use client";

import { useTheme } from '../../../context/ThemeContext';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AdminHome() {
  const { language, isDarkMode } = useTheme(); // Read-only access to language and mode
  const [content, setContent] = useState('');
  const [originalContent, setOriginalContent] = useState(''); // Store original fetched content

  // Debug language and content changes
  useEffect(() => {
    console.log('Current language:', language);
    console.log('Current content:', content);
  }, [language, content]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/home');
        if (response.data.length > 0) {
          const fetchedContent = response.data[0].content;
          console.log('Original content from API:', fetchedContent);
          setOriginalContent(fetchedContent); // Store original content
          const translatedContent = translateContent(fetchedContent);
          console.log('Translated content on fetch:', translatedContent);
          setContent(translatedContent); // Set translated content
        } else {
          console.log('No content found in response');
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };
    fetchContent();
  }, []); // Fetch only on mount

  useEffect(() => {
    // Re-translate content when language changes
    if (originalContent) {
      const translatedContent = translateContent(originalContent);
      console.log('Re-translated content on language change:', translatedContent);
      setContent(translatedContent);
    }
  }, [language, originalContent]); // Trigger on language or original content change

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/save-content', {
        type: 'home',
        content,
        email: 'eyobwende18@gmail.com',
      });
      const response = await axios.get('http://localhost:5000/api/get-content/eyobwende18@gmail.com/home');
      if (response.data.length > 0) {
        const fetchedContent = response.data[0].content;
        setOriginalContent(fetchedContent);
        const translatedContent = translateContent(fetchedContent);
        setContent(translatedContent); // Ensure translated content is set
      }
      alert('Content updated successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to update content!');
    }
  };

  // Improved translation function
  const translateContent = (text) => {
    const translations = {
      en: {
        'i am a developer and designer with best style what else': 'i am a developer and designer with best style what else', // Identity for English
        'እኔ ልምድ ያለበት ገንቢው እና ንግብ ባለቤት ነኝ መቼ ተጨማሪ?': 'i am a developer and designer with best style what else',
      },
      am: {
        'i am a developer and designer with best style what else': 'እኔ ልምድ ያለበት ገንቢው እና ንግብ ባለቤት ነኝ መቼ ተጨማሪ?',
        'እኔ ልምድ ያለበት ገንቢው እና ንግብ ባለቤት ነኝ መቼ ተጨማሪ?': 'እኔ ልምድ ያለበት ገንቢው እና ንግብ ባለቤት ነኝ መቼ ተጨማሪ?', // Identity for Amharic
      },
    };
    const normalizedText = text ? text.trim().toLowerCase() : text;
    const langTranslations = translations[language] || translations.en;
    for (const [key, value] of Object.entries(langTranslations)) {
      if (normalizedText === key.toLowerCase()) {
        return value;
      }
    }
    return text || ''; // Fallback to original text or empty if no match
  };

  const translations = {
    en: { title: 'Admin Home', placeholder: 'Enter home page content', submit: 'Submit' },
    am: { title: 'የአስተዳደር መነሻ', placeholder: 'የመነሻ ገፅ ያስገቡ', submit: 'ይላኩ' },
  };

  const t = translations[language] || translations.en; // Fallback to English if language is undefined

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="pt-4">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t.title}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
            placeholder={t.placeholder}
            rows="4"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-green-700 dark:hover:bg-green-800"
          >
            {t.submit}
          </button>
        </form>
      </div>
    </div>
  );
}