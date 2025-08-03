import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/FormValidatation";
import axios from "axios"; // ✅ Using default axios

import { useAuth } from "./context/AuthContext";

const Login = () => {
  const { login: setAuthUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationMessage = checkValidData(email, password);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login", // 💡 Use full URL
        { email, password },
        { withCredentials: true } // ✅ Needed if using cookies/session
      );

      if (res.data.success) {
        setAuthUser(res.data.user);
        console.log("Login successful:", res.data);
        navigate("/dashboard");
      }
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(errMsg);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-300"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 transition duration-150"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage(null);
          }}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-3 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 transition duration-150"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage(null);
            }}
            required
          />
          <span
            className="absolute right-3 top-3 text-sm text-blue-600 cursor-pointer select-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-2">
            {errorMessage}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200 mt-2"
        >
          Login
        </button>

        <p className="text-center mt-5 text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
