const authContoller = require("../controllers/authContoller");
const express = require("express");
const router = express.Router();

//authRoutes
router.post('/register', authContoller.register);
router.post('/login', authContoller.login);
router.post("/logout", authContoller.logout);


module.exports = router;