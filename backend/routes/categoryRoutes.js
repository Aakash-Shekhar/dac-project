// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Your authentication middleware
const categoryContoller = require('../controllers/categoryController'); // Your category controller

// Apply authMiddleware to all routes in this router
router.use(authMiddleware);

// @route   POST /categories
// @desc    Create a new category for the logged-in user
// @access  Private
router.post("/", categoryContoller.createCategory);

// @route   GET /categories
// @desc    Get all categories for the logged-in user
// @access  Private
router.get("/", categoryContoller.getCategories);

// @route   PUT /categories/:id
// @desc    Update a specific category for the logged-in user
// @access  Private
router.put("/:id", categoryContoller.updateCategory);

// @route   DELETE /categories/:id
// @desc    Delete a specific category for the logged-in user
// @access  Private
router.delete("/:id", categoryContoller.deleteCategory);

module.exports = router;