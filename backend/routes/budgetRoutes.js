const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const budgetController = require("../controllers/budgetController");

//protecting all routes
router.use(authMiddleware);

router.post("/",  budgetController.createBudget);
router.get("/",  budgetController.getBudgets);
router.put("/:id",  budgetController.updateBudget);
router.delete("/:id",  budgetController.deleteBudget);

module.exports = router;
