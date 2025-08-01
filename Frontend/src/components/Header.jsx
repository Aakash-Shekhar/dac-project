import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-yellow-400 px-4 py-5 w-full relative flex items-center justify-center">
      {/* Centered Icon + Title */}
      <div className="flex items-center gap-2">
        <img src="/image/budget.png" alt="Expense Icon" className="w-8 h-8" />
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
      </div>

      {/* Hamburger icon for mobile (placed at right) */}
      <button
        className="absolute right-4 md:hidden text-black focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
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
    </header>
  );
};

export default Header;
