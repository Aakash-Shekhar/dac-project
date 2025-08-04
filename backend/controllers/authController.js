const User = require("../models/User");
const Category = require("../models/Category");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../services/emailService');
const crypto = require('crypto');

const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

exports.register = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "All fields are required", success: false });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format", success: false });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters long, include 1 uppercase, 1 lowercase, and 1 number.",
            success: false,
        });
    }

    const trimmedFirstname = firstname.trim();
    const trimmedLastname = lastname.trim();
    const trimmedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
        return res.status(409).json({
            message: "User already exists with this email",
            success: false,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        firstname: trimmedFirstname,
        lastname: trimmedLastname,
        email: trimmedEmail,
        password: hashedPassword,
    });

    const defaultCategories = [
        { userid: newUser._id, name: "Uncategorized (Expense)", type: "expense" },
        { userid: newUser._id, name: "Uncategorized (Income)", type: "income" },
        { userid: newUser._id, name: "Groceries", type: "expense" },
        { userid: newUser._id, name: "Rent", type: "expense" },
        { userid: newUser._id, name: "Utilities", type: "expense" },
        { userid: newUser._id, name: "Transportation", type: "expense" },
        { userid: newUser._id, name: "Dining Out", type: "expense" },
        { userid: newUser._id, name: "Entertainment", type: "expense" },
        { userid: newUser._id, name: "Salary", type: "income" },
        { userid: newUser._id, name: "Freelance", type: "income" },
        { userid: newUser._id, name: "Gift", type: "income" },
    ];

    await Category.insertMany(defaultCategories);
    console.log(`Created default categories for new user: ${newUser.email}`);

    return res.status(201).json({ message: "User Registered Successfully", success: true, user: newUser });
});

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const trimmedEmail = email.trim().toLowerCase();

    const userExist = await User.findOne({ email: trimmedEmail });
    if (!userExist) {
        return res.status(404).json({ message: "User not found with this email", success: false });
    }

    const isPasswordMatched = await bcrypt.compare(password, userExist.password);

    if (!isPasswordMatched) {
        return res.status(401).json({ message: "Invalid Credentials", success: false });
    }

    const token = jwt.sign(
        { id: userExist._id, email: userExist.email },
        process.env.jwt_secret_key,
        { expiresIn: "1h" }
    );

    return res
        .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 60 * 60 * 1000,
        })
        .status(200)
        .json({
            message: "User Logged In Successfully",
            success: true,
            user: {
                id: userExist._id,
                firstname: userExist.firstname,
                lastname: userExist.lastname,
                email: userExist.email,
                avatar: userExist.avatar,
            },
        });
});

exports.logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
    });
    return res.status(200).json({
        message: "User logged out successfully",
        success: true,
    });
};

exports.forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        console.log(`Forgot password: User with email ${email} not found.`);
        return res.status(200).json({ success: true, message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const emailContent = `
        <h1>Password Reset Request</h1>
        <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `;

    try {
        await sendEmail(user.email, 'FinTrack Password Reset', emailContent);
        res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        console.error('Forgot password email sending failed:', error);
        res.status(500).json({ success: false, message: 'Failed to send password reset email. Please try again later.' });
    }
});

exports.resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    if (!newPassword || !confirmNewPassword) {
        return res.status(400).json({ success: false, message: 'Please enter a new password and confirm it.' });
    }
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        return res.status(400).json({
            message: "New password must be at least 8 characters long, include 1 uppercase, 1 lowercase, and 1 number.",
            success: false,
        });
    }

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password has been successfully reset.' });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select("-password");
    res.status(200).json({
        success: true,
        message: "All users fetched successfully",
        users,
    });
});