import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "./context/AuthContext";

const Header = ({ toggleSidebar }) => {
  const { logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <header className="bg-yellow-400 px-4 py-4 w-full flex items-center justify-between md:justify-center relative shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center gap-2 text-black">
        <img
          src="/image/budget.png"
          alt="Expense Icon"
          className="w-8 h-8 object-contain"
        />
        <h1 className="text-2xl font-semibold tracking-wide">
          Expense Tracker
        </h1>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 md:hidden p-2 rounded hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* User Icon - Hidden on Mobile (below md) */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:block cursor-pointer">
        <FaUserCircle
          size={28}
          onClick={() => setShowUserMenu((prev) => !prev)}
          className="text-black hover:text-white transition-colors duration-200"
        />

        {/* Dropdown Menu */}
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-28 bg-white rounded shadow-md py-2 z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-yellow-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
