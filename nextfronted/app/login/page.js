"use client";

import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaEnvelope, FaLock, FaGlobe, FaSun, FaMoon } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { language, setLanguage, isDarkMode, toggleDarkMode } = useTheme();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", credentials);
      if (response.data.email === "eyobwende18@gmail.com") {
        router.push("/admin/home");
      } else if (response.data.message === "Login successful") {
        router.push("/user/home");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Login failed!");
    }
  };

  // Translation object including "Personal Website"
  const translations = {
    en: {
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      needAccount: "Need an account?",
      signUp: "Sign Up",
      personalWebsite: "Personal Website",
    },
    am: {
      email: "ኢሜል",
      password: "የይለፍ ቃል",
      signIn: "ይግቡ",
      needAccount: "መለያ የለዎትም?",
      signUp: "ይመዝገቡ",
      personalWebsite: "የግል ድህረ-ገፅ",
    },
  };

  const t = translations[language];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/image9.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Overlay for contrast */}
      <div className="fixed top-4 right-4 flex items-center space-x-6 z-10">
        <div className="text-left">
          <h1
            className="text-xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 dark:from-green-300 dark:via-emerald-400 dark:to-teal-500 px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.7)] dark:shadow-[0_0_15px_rgba(0,255,0,0.5)] transition-all duration-300"
          >
            {t.personalWebsite}
          </h1>
        </div>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="appearance-none bg-gray-900 dark:bg-gray-700 text-white border-2 border-purple-500 dark:border-purple-400 rounded-lg py-2 pl-3 pr-8 focus:outline-none focus:ring-4 focus:ring-purple-300 animate-pulse-slow hover:scale-105 hover:shadow-[0_0_20px_rgba(147,51,255,0.7)] transition-all duration-300"
          >
            <option value="en">EN</option>
            <option value="am">አማ</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <FaGlobe className="text-purple-500 dark:text-purple-400 animate-pulse" />
          </div>
        </div>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-900 dark:bg-gray-700 text-white border-2 border-gradient-rainbow rounded-lg p-2 hover:rotate-180. transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-800"
          style={{
            background: "linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff)",
            animation: "rainbow 5s linear infinite",
          }}
        >
          {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>
      </div>
      <div className="relative z-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">{t.signIn}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">{t.email}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="user@example.com"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">{t.password}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-500 dark:text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {t.signIn}
          </button>
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            {t.needAccount}
            <button onClick={() => router.push("/register")} className="ml-1 text-blue-600 dark:text-blue-400 hover:underline">
              {t.signUp}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}