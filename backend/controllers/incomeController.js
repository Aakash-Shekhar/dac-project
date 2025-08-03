const Income = require("../models/Income");
const mongoose = require("mongoose")
// Add income
exports.addIncome = async (req, res) => {
  const { amount, source } = req.body;

  if (!amount || !source) {
    return res
      .status(400)
      .json({ success: false, message: "Amount and Source are required" });
  }

    const userid = req.user.id;
    const trimmedSource = source.trim();
    
    try {
      
    const income = await Income.create({ userId: userid,amount,source:trimmedSource });

    return res.status(201).json({ success: true, message: "Income added", income });
  } catch (error) {
    console.error("Error adding income", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all incomes of logged-in user
exports.getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({
      date: -1,
    });

    return res.status(200).json({ success: true, incomes });
  } catch (error) {
    console.error("Error fetching incomes", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get total income
exports.getTotalIncome = async (req, res) => {
  try {
    const result = await Income.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const total = result.length > 0 ? result[0].total : 0;

    return res.status(200).json({ success: true, total });
  } catch (error) {
    console.error("Error calculating total income", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


//Update Income
// Update Income
exports.updateIncome = async (req, res) => {
  const { amount, source, date } = req.body;

  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({ message: "Income not found", success: false });
    }

    // Ensure only the owner can update
    if (income.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    // Apply updates
    if (amount !== undefined) income.amount = amount;
    if (source !== undefined) income.source = source.trim();
    if (date !== undefined) income.date = date;

    const updatedIncome = await income.save();

    res.status(200).json({
      message: "Income updated successfully",
      success: true,
      income: updatedIncome,
    });
  } catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};


// Delete an income
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Income.findByIdAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    res.status(200).json({ success: true, message: "Income deleted" });
  } catch (error) {
    console.error("Error deleting income", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
