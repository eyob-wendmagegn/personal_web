"use client";

import { useState } from "react";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { useRouter } from "next/navigation";

export default function ChangePassword({ onClose }) {
  const { language } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const translations = {
    en: {
      title: "Change Password",
      oldPassword: "Old Password",
      newPassword: "New Password",
      change: "Change Password",
      cancel: "Cancel",
      error: "Invalid old password or server error.",
      success: "Password changed successfully!",
    },
    am: {
      title: "የይለፍ ቃልን ለመቀየር",
      oldPassword: "ያለበት የይለፍ ቃል",
      newPassword: "አዲስ የይለፍ ቃል",
      change: "የይለፍ ቃልን ቀይር",
      cancel: "ሰረዝ",
      error: "ያለበት የይለፍ ቃል ያልተዛመተ ነው ወይም ሰርቨር መልካም አይደለም።",
      success: "የይለፍ ቃል በተሳካ ሁኔታ ተቀይሯል!",
    },
  };

  const t = translations[language] || translations.en;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem("userEmail");
      if (!email) throw new Error("User not authenticated");

      const response = await axios.post("http://localhost:5000/api/change-password", {
        email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (response.status === 200) {
        setSuccess(t.success);
        setTimeout(() => {
          onClose();
          router.push("/user/home");
        }, 1000);
      }
    } catch (error) {
      console.error("Change password error:", error);
      setError(t.error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t.title}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{t.oldPassword}</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              autocomplete="current-password"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">{t.newPassword}</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              autocomplete="new-password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {t.change}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
          >
            {t.cancel}
          </button>
        </form>
      </div>
    </div>
  );
}