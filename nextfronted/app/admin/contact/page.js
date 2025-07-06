'use client';

import { useTheme } from '../../../context/ThemeContext';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function AdminContact() {
  const { language, isDarkMode } = useTheme(); // Access language and mode
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    // Re-translate messages when language changes
    if (messages.length > 0) {
      const translatedMessages = messages.map(msg => ({
        ...msg,
        message: translateContent(msg.message),
      }));
      setMessages(translatedMessages);
    }
  }, [language, messages]); // Trigger on language or messages change

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/get-contact/eyobwende18@gmail.com'); // Keep for consistency
      const fetchedMessages = response.data || [];
      console.log('Fetched messages:', fetchedMessages); // Debug fetched content
      const translatedMessages = fetchedMessages.map(msg => ({
        ...msg,
        message: translateContent(msg.message),
      }));
      console.log('Translated messages:', translatedMessages); // Debug translated content
      setMessages(translatedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Translation function for message content
  const translateContent = (text) => {
    const translations = {
      en: {
        'hello, i need help with my website': 'ሰላም, በድህረ-ገፁ ላይ መርዳት እንዳይፈልጋል',
        'please contact me at my email': 'እባክዎ በኢሜይልየቤት ይጠንቀቁልኝ',
        'i have a project idea': 'ፕሮጀክት ሀሳብ አለኝ',
      },
      am: {
        'ሰላም, በድህረ-ገፁ ላይ መርዳት እንዳይፈልጋል': 'hello, i need help with my website',
        'እባክዎ በኢሜይልየቤት ይጠንቀቁልኝ': 'please contact me at my email',
        'ፕሮጀክት ሀሳብ አለኝ': 'i have a project idea',
      },
    };
    const normalizedText = text ? text.trim().toLowerCase() : text;
    const langTranslations = translations[language] || translations.en;
    for (const [key, value] of Object.entries(langTranslations)) {
      if (normalizedText === key.toLowerCase()) {
        return value;
      }
    }
    console.log('No translation found for message:', normalizedText); // Debug missing translations
    return text || ''; // Fallback to original text or empty if no match
  };

  // Translation for static UI elements
  const translations = {
    en: {
      title: 'Contact Messages',
      noMessages: 'No messages yet.',
    },
    am: {
      title: ' መልእክቶች',
      noMessages: 'መልእክት የለም።',
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`p-6 max-w-3xl mx-auto mt-9 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
      <h1 className={`text-3xl font-bold mb-6 border-b-2 pb-2 ${isDarkMode ? 'border-purple-400 text-purple-200' : 'border-purple-500 text-gray-900'}`}>{t.title}</h1>
      {messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg._id} className={`bg-white rounded-xl shadow-lg p-4 border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-200 hover:shadow-gray-700' : 'border-gray-200 bg-white text-gray-700 hover:shadow-xl'} transition-shadow duration-300`}>
              <p className="text-gray-700"><strong>Email:</strong> {msg.email}</p>
              <p className="text-gray-600 mt-2">{msg.message}</p>
              <p className="text-sm text-gray-500 mt-2">Sent: {new Date(msg.timestamp).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">{t.noMessages}</p>
      )}
    </div>
  );
}