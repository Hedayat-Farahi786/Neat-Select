// src/components/Navbar.jsx
import React from "react";
import { Sun, Moon } from "react-feather";
import logo from "../assets/logo.png";
const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <div className="text-2xl font-bold flex items-center justify-center space-x-3">
        <img src={logo} className="w-8" />
        <span>Neat Select</span>
      </div>
      <div className="flex items-center">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Dark Mode"
        >
          {theme === "light" ? (
            <Moon size={20} className="text-gray-800" />
          ) : (
            <Sun size={20} className="text-yellow-300" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
