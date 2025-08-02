const mongoose = require("mongoose");
const Budget = require("../models/Budget");
const Category = require("../models/Category");

// Create a Budget
exports.createBudget = async (req, res) => {
  const { category, limit, period, startdate, enddate } = req.body;
  const userid = req.user.id;

    try {
       if (!category || !limit || !period || !startdate || !enddate) {
         return res
           .status(400)
           .json({ success: false, message: "All fields are required" });
        }
        
        if (!["monthly", "weekly", "yearly"].includes(period)) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Period must be one of 'monthly', 'weekly', or 'yearly'",
            });
        }

       if (!mongoose.Types.ObjectId.isValid(category)) {
         return res
           .status(400)
           .json({ success: false, message: "Invalid category ID" });
       }

       if (typeof limit !== "number" || limit <= 0) {
         return res
           .status(400)
           .json({
             success: false,
             message: "Limit must be a positive number",
           });
        }
        
    const categoryExists = await Category.findOne({ _id: category, userid });
    if (!categoryExists) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }

    const budget = await Budget.create({
      userid,
      category,
      limit,
      period,
      startdate,
      enddate,
    });

    res.status(201).json({ success: true, budget });
  } catch (error) {
    console.log("Error creating budget:", error);
    res.status(500).json({ success: false, message: "Error creating budget" });
  }
};

// Get All Budgets
exports.getBudgets = async (req, res) => {
  const userid = req.user.id;

  try {
    const budgets = await Budget.find({ userid }).populate("category");
    res.status(200).json({ success: true, budgets });
  } catch (error) {
    console.log("Error fetching budgets:", error);
    res.status(500).json({ success: false, message: "Error fetching budgets" });
  }
};

// Update Budget
exports.updateBudget = async (req, res) => {
  const userid = req.user.id;
  const { id } = req.params;

    try {
      if (
        req.body.period &&
        !["monthly", "weekly", "yearly"].includes(req.body.period)
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Period must be one of 'monthly', 'weekly', or 'yearly'",
          });
      }

    const budget = await Budget.findOneAndUpdate(
      { _id: id, userid },
      req.body,
      { new: true }
    );

    if (!budget) {
      return res
        .status(404)
        .json({ success: false, message: "Budget not found" });
    }

    res.status(200).json({ success: true, budget });
  } catch (error) {
    console.log("Error updating budget:", error);
    res.status(500).json({ success: false, message: "Error updating budget" });
  }
};

// Delete Budget
exports.deleteBudget = async (req, res) => {
  const userid = req.user.id;
  const { id } = req.params;

  try {
    const budget = await Budget.findOneAndDelete({ _id: id, userid });

    if (!budget) {
      return res
        .status(404)
        .json({ success: false, message: "Budget not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Budget deleted successfully" });
  } catch (error) {
    console.log("Error deleting budget:", error);
    res.status(500).json({ success: false, message: "Error deleting budget" });
  }
};
