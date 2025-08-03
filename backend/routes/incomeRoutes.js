const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");
const authMiddleware = require("../middlewares/authMiddleware");


router.use(authMiddleware);

router.post("/add", incomeController.addIncome);
router.get("/all", incomeController.getAllIncomes);
router.get("/total", incomeController.getTotalIncome);
router.put("/:id", incomeController.updateIncome);
router.delete("/:id", incomeController.deleteIncome);

module.exports = router;
