"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext";

export default function Logout({ onClose }) {
  const router = useRouter();
  const { language } = useTheme();

  const translations = {
    en: "Logout",
    am: "ውጣ",
  };

  const t = translations[language] || translations.en;

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    onClose();
    router.push("/login");
  };

  return (
    <div onClick={handleLogout} className="cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded-md transition-colors duration-200">
      {t}
    </div>
  );
}