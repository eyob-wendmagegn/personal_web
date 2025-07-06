"use client";

import { useState } from "react";
import axios from "axios";
import { useTheme } from "../../../context/ThemeContext";

export default function UserContact() {
  const { language, isDarkMode } = useTheme(); // Access language and mode
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/save-contact", {
        email,
        message,
      });
      setEmail("");
      setMessage("");
      setStatus("Message sent successfully!");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Please try again.");
      setTimeout(() => setStatus(""), 3000);
    }
  };

  // Translation object for static text
  const translations = {
    en: {
      title: "Contact Me",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      messageLabel: "Message",
      messagePlaceholder: "Write your message here...",
      send: "Send",
      success: "Message sent successfully!",
      failure: "Failed to send message. Please try again.",
    },
    am: {
      title: "ይገናኝ",
      emailLabel: "ኢሜይል",
      emailPlaceholder: "ኢሜይልዎን ያስገቡ",
      messageLabel: "መልእክት",
      messagePlaceholder: "መልእክትዎን እዚህ ያቅርቡ...",
      send: "ይላኩ",
      success: "ማስታወቂያ በተሳኋት ተልኳል!",
      failure: "ማስታወቂያ ማስተናገድ አልተቻለም። እባክዎ እንደገና ይሞክሩ።",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`p-6 max-w-2xl mx-auto ${isDarkMode ? "text-gray-200" : "text-gray-900"} transition-colors duration-300`}>
      <h1 className={`text-3xl font-bold mb-6 border-b-2 ${isDarkMode ? "border-gray-600" : "border-green-500"} pb-2`}>{t.title}</h1>
      <form onSubmit={handleSubmit} className={`bg-white rounded-xl shadow-lg p-6 border ${isDarkMode ? "dark:bg-gray-800 dark:border-gray-700" : "border-gray-200"}`}>
        <div className="mb-4">
          <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{t.emailLabel}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            placeholder={t.emailPlaceholder}
            required
          />
        </div>
        <div className="mb-4">
          <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{t.messageLabel}</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-y min-h-[150px] dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            placeholder={t.messagePlaceholder}
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition duration-300 ${isDarkMode ? "dark:hover:bg-green-800" : ""}`}
        >
          {t.send}
        </button>
        {status && <p className={`mt-2 text-center text-sm font-medium ${isDarkMode ? "text-green-400" : "text-green-600"}`}>{status === t.success ? t.success : t.failure}</p>}
      </form>
    </div>
  );
}