"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Sun, Moon } from "lucide-react";

export default function SuccessPage() {
  const [animationData, setAnimationData] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load the Lottie animation
    fetch("/lottie/success.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));

    // Theme detection
    const root = window.document.documentElement;
    const isSysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && isSysDark)) {
      root.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDark = () => {
    const root = window.document.documentElement;
    root.classList.toggle("dark");
    const newTheme = root.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setIsDark(newTheme === "dark");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center text-center relative px-6 py-12 transition-colors duration-500">
      {/* 🌗 Floating Theme Toggle */}
      <button
        onClick={toggleDark}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-110"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-400" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700" />
        )}
      </button>

      {/* ✅ Animation */}
      {animationData && (
        <Lottie animationData={animationData} loop={false} className="h-60 w-60 mb-6" />
      )}

      <h1 className="text-3xl font-bold">Form Submitted Successfully!</h1>
      <p className="text-lg mt-2">We will get back to you shortly.</p>

      {/* ✅ Back to Home Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 px-6 py-2 bg-teal-400 hover:bg-teal-500 text-white font-semibold rounded-md shadow-sm transition duration-200"
      >
        Back to Home
      </button>
    </div>
  );
}
