const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  // Email format check (basic)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Invalid email format", success: false });
  }

  // Password strength check
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, and 1 number.",
      success: false,
    });
  }

  const trimmedFirstname = firstname.trim();
  const trimmedLastname = lastname.trim();
  const trimmedEmail = email.trim().toLowerCase();

  try {
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUSer = await User.create({
      firstname: trimmedFirstname,
      lastname : trimmedLastname,
      email : trimmedEmail,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ message: "User Registered Successfull", success: true, newUSer });
  } catch (error) {
    console.error("Error registering user", error);
    return res
      .status(500)
      .json({ message: "Error registering user", success: false });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const trimmedEmail = email.trim().toLowerCase();

  try {
    const userExist = await User.findOne({ email: trimmedEmail });
    if (!userExist) {
      return res
        .status(404)
        .json({ message: "User not found with this email", success: false });
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      userExist.password
    );
    

    if (!isPasswordMatched) {
      return res
        .status(500)
        .json({ message: "Invalid Credentials", success: false });
      }
      
    const token = jwt.sign({ id: userExist._id, email: userExist.email }, process.env.jwt_secret_key, {expiresIn:"1h"});

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Set true in production
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .status(200)
      .json({
        message: "User Logged In Successfull",
        success: true,
        user: {
          id: userExist._id,
          firstname: userExist.firstname,
          lastname: userExist.lastname,
          email: userExist.email,
        },
      });
      
  } catch (error) {
    console.error("Error while Logged in", error);
    return res
      .status(500)
      .json({ message: "Error while Logged in", success: false });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({
    message: "User logged out successfully",
    success: true,
  });
};

