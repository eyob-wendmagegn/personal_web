"use client";

import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";

export default function RegisterPage() {
  const { language, isDarkMode } = useTheme(); // Access language and mode
  const [credentials, setCredentials] = useState({ email: "", password: "", confirmPassword: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      alert(translations[language || "en"].passwordMismatch || "Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email: credentials.email,
        password: credentials.password,
      });
      alert(response.data.message);
      router.push("/login");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(translations[language || "en"].registrationFailed || "Registration failed!");
    }
  };

  // Translation object for static text
  const translations = {
    en: {
      title: "Sign Up",
      emailLabel: "Email",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",
      emailPlaceholder: "user@example.com",
      passwordPlaceholder: "••••••••",
      confirmPasswordPlaceholder: "••••••••",
      submitButton: "Sign Up",
      haveAccount: "Already have an account?",
      loginLink: "Login",
      passwordMismatch: "Passwords do not match!",
      registrationFailed: "Registration failed!",
    },
    am: {
      title: "ይመዝገቡ",
      emailLabel: "ኢሜል",
      passwordLabel: "የይለፍ ቃል",
      confirmPasswordLabel: "የይለፍ ቃል ያረጋግጡ",
      emailPlaceholder: "user@example.com",
      passwordPlaceholder: "••••••••",
      confirmPasswordPlaceholder: "••••••••",
      submitButton: "መለያ ይፍጠሩ",
      haveAccount: "መለያ አለዎት?",
      loginLink: "ይግቡ",
      passwordMismatch: "የይለፍ ቃሎዎት አልተዛመደም!",
      registrationFailed: "መመዝገቢያ አልተፈጸመም!",
    },
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center ${isDarkMode ? "dark:bg-gray-900" : ""} transition-colors duration-300`}>
      <div className={`bg-white p-8 rounded-lg shadow-md w-96 ${isDarkMode ? "dark:bg-gray-800" : ""}`}>
        <h1 className={`text-2xl font-bold text-center mb-6 ${isDarkMode ? "dark:text-gray-200" : "text-gray-800"}`}>{t.title}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block mb-2 ${isDarkMode ? "dark:text-gray-300" : "text-gray-700"}`}>{t.emailLabel}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className={`text-gray-500 ${isDarkMode ? "dark:text-gray-400" : ""}`} />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" : ""}`}
                placeholder={t.emailPlaceholder}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className={`block mb-2 ${isDarkMode ? "dark:text-gray-300" : "text-gray-700"}`}>{t.passwordLabel}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className={`text-gray-500 ${isDarkMode ? "dark:text-gray-400" : ""}`} />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" : ""}`}
                placeholder={t.passwordPlaceholder}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className={`block mb-2 ${isDarkMode ? "dark:text-gray-300" : "text-gray-700"}`}>{t.confirmPasswordLabel}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className={`text-gray-500 ${isDarkMode ? "dark:text-gray-400" : ""}`} />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600" : ""}`}
                placeholder={t.confirmPasswordPlaceholder}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDarkMode ? "dark:hover:bg-green-800" : ""}`}
          >
            {t.submitButton}
          </button>
          <p className={`text-center mt-4 ${isDarkMode ? "dark:text-gray-400" : "text-gray-600"}`}>
            {t.haveAccount}
            <button onClick={() => router.push("/login")} className={`ml-1 ${isDarkMode ? "dark:text-blue-300" : "text-blue-600"} hover:underline`}>
              {t.loginLink}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}