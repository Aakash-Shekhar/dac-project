const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const transactionController = require("../controllers/transactionController");

//Protecting all routes
router.use(authMiddleware);

router.post('/', transactionController.createTransaction);
router.get("/", transactionController.getAllTransactions);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

module.exports = router;