import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-4 text-center">
        Welcome to Personal Finance Tracker
      </h1>
      <p className="text-lg md:text-xl text-green-700 mb-8 text-center max-w-xl">
        Track your income, expenses, and budget with ease.
      </p>
      <div className="flex gap-6">
        <Link
          to="/login"
          className="px-6 py-3 bg-green-600 text-white rounded-xl text-lg font-semibold shadow hover:bg-green-700 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 bg-white border-2 border-green-600 text-green-700 rounded-xl text-lg font-semibold shadow hover:bg-green-100 transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
