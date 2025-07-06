"use client";

import { useTheme } from "../../context/ThemeContext";

export default function Help({ onClose }) {
  const { language } = useTheme();

  const translations = {
    en: {
      title: "Help",
      message: "For support, please contact me at support@eyobwendmagegn.com or visit our help page.",
      close: "Close",
    },
    am: {
      title: "ርዳታ",
      message: "ለድጋፍ እባክዎ ያግኙን support@eyobwendmagegn.com ወይም ድጋፍ ገፅን ይጎብኙ።",
      close: "ዝጋ",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{t.message}</p>
        <button
          onClick={onClose}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
}