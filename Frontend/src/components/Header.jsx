import React from "react";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-yellow-400 px-4 py-4 w-full flex items-center justify-between md:justify-center relative shadow-md">
      {/* Centered Icon + Title */}
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

      {/* Hamburger Icon - Visible only on mobile */}
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
    </header>
  );
};

export default Header;
