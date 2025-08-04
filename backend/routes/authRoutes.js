const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-verification-otp', authController.sendVerificationOtp);
router.post('/verify-email-otp', authController.verifyEmailOtp);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

router.post("/logout", authMiddleware, authController.logout);
router.get("/users", authMiddleware, authController.getAllUsers);

module.exports = router;