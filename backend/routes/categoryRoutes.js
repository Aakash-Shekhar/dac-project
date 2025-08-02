const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const categoryController = require("../controllers/categoryController");

//protecting all routes
router.use(authMiddleware);


router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;