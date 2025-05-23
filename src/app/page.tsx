"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Sun, Moon, Instagram, Twitter, Linkedin } from "lucide-react";
import "@fontsource/bebas-neue";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/600.css";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--font-heading", "'Bebas Neue', sans-serif");
    root.style.setProperty("--font-body", "'Montserrat', sans-serif");
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (stored === "dark" || (!stored && prefersDark)) {
      root.classList.add("dark");
      setIsDark(true);
    } else {
      root.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleDark = () => {
    const root = document.documentElement;
    const newTheme = root.classList.contains("dark") ? "light" : "dark";
    root.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setIsDark(newTheme === "dark");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "27256bd9-b5db-4121-9e03-fe68d0a0f71d",
          ...formData,
        }),
      });
      const result = await response.json();
      if (result.success) {
        window.location.href = "/success";
      } else {
        window.location.href = "/error";
      }
    } catch (_error) {
      console.error("Form submission failed:", _error);
      window.location.href = "/error";
    }
  };

  return (
    <div className="min-h-screen bg-[#fff3e6] dark:bg-gray-900 text-black dark:text-white font-sans transition-colors duration-500">
      {/* Theme Toggle */}
      <button
        onClick={toggleDark}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-110"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
      </button>

      <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div className="space-y-6">
          <Image src="/logo.png" alt="TheOpenShift Logo" width={150} height={50} />

          {/* Text Section with transition */}
          <div
            className={`transition-all duration-500 ${
              showForm ? "opacity-0 scale-95 h-0 overflow-hidden" : "opacity-100 scale-100"
            }`}
          >
            <h1 className="text-[4rem] sm:text-[5rem] font-bold leading-[0.8] font-[Bebas Neue]">
              Launching<br />soon
            </h1><br/>
            <p className="text-lg max-w-md text-gray-800 dark:text-gray-300 font-[Montserrat]">
              Where compassion meets precision. The Open Shift is building the future of care connections. Ready to join us?
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-[#019393] hover:bg-[#017b7b] text-white font-semibold py-2 px-4 rounded-md"
            >
              Contact Now
            </button>
          </div>

          {/* Form Section with transition */}
          <div
            className={`transition-all duration-500 ${
              showForm ? "opacity-100 scale-100" : "opacity-0 scale-95 h-0 overflow-hidden"
            }`}
          >
            <button
              onClick={() => setShowForm(false)}
              type="button"
              className="self-start mb-2 text-[#019393] hover:text-[#017b7b] font-semibold text-sm"
            >
              ← Back
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Name"
                className="p-3 rounded border border-gray-300 bg-white text-black placeholder-gray-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="p-3 rounded border border-gray-300 bg-white text-black placeholder-gray-500"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Message"
                className="p-3 rounded border border-gray-300 bg-white text-black placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-[#019393] hover:bg-[#017b7b] text-white font-bold py-3 px-6 rounded"
              >
                SEND
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4 text-teal-500 text-xl pt-4">
            <a href="#" className="hover:text-teal-700"><Instagram /></a>
            <a href="#" className="hover:text-teal-700"><Twitter /></a>
            <a href="#" className="hover:text-teal-700"><Linkedin /></a>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex justify-center items-start">
          <Image
            src="/illus.png"
            alt="Illustration"
            width={700}
            height={700}
            className="object-contain"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0b1223] text-white dark:text-white px-8 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="font-bold text-lg">TheOpenShift</h2>
            <p className="text-sm mt-2">Connecting aged care staff with opportunities.</p>
          </div>
          <div>
            <h2 className="font-bold text-lg">Quick Links</h2>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Features</li>
              <li>How it Works</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg">Legal</h2>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg">Contact</h2>
            <p className="text-sm mt-2">Email: contact@theopenshift.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm border-t border-gray-700 pt-4">
          © 2025 TheOpenShift. All rights reserved.
        </div>
      </footer>
    </div>
  );
}