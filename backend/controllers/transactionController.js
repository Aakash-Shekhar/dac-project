const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const Category = require("../models/Category");

//create a new Transaction
exports.createTransaction = async(req, res) => {
    const { type, amount, category, description, date, recurring } = req.body;
    const userid = req.user.id;

    try {
        if (!amount || !type || !category || !date) {
          return res
            .status(400)
            .json({ success: false, message: "All fields are required!" });
        }

        if (typeof amount !== "number" || amount <= 0) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Amount must be a positive number",
            });
        }

        if (!["income", "expense"].includes(type)) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Type must be either 'income' or 'expense'",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(category)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid category ID" });
        }

        const categoryDoc = await Category.findOne({ _id: category, userid });
        if (!categoryDoc) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid category" });
        }

        const transaction = await Transaction.create({
            userid,
            type:categoryDoc.type,
            amount,
            category,
            description,
            date,
            recurring,
        });

        return res.status(201).json({ success: true, transaction });
    } catch (error) {
        console.log("Error creating tranction:" + error);
        res.status(500).json({success:false,message:"Server Error while creating Transaction"})
    }
}



//Get All Transaction
exports.getAllTransactions = async (req, res) => {
    const userid = req.user.id;
    const { type, startDate, endDate } = req.query;

    const query = { userid };

    //sorting : type setting like expense/income etc
    if (type) {
        query.type = type;
    }
     
    //sorting: from startDate to endDate
    if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    try {
        const transactions = await Transaction.find(query).sort({ date: -1 }).populate("category");
        res.status(200).json({ success: true, transactions });
    } catch (error) {
        console.log("Error fetching transactions: ", error);
        res.status(500).json({ success: false, message: "Error fetching Transactions" });
    }
}


//update a transaction

exports.updateTransaction = async (req, res) => {
    const userid = req.user.id;
    const { id } = req.params;

    try {
        
        if (req.body.type && !["income", "expense"].includes(req.body.type)) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Type must be either 'income' or 'expense'",
            });
        }

        const transaction = await Transaction.findByIdAndUpdate({ _id: id, userid }, req.body, { new: true });

        if (!transaction) {
            return res.status(404).json({ success: false, mesaage: "Transaction not found" });
        }

        res.status(200).json({ success: true, transaction });
    } catch (error) {
        console.log("Error updating transaction", error);
        res.status(500).json({ success: false, message: "Error while updating transaction" });
    }
}


//delete a Transaction
exports.deleteTransaction = async (req, res) => {
    const userid  = req.user.id;
    const { id } = req.params;

    try {
        const transaction = await Transaction.findByIdAndDelete({ _id: id, userid });

        if (!transaction) {
            return res.status(404).json({ success: false, message: "Transaction not found" });
        }

        res.status(200).json({ success: true, message: "Transaction deleted Successfully" });
    } catch (error) {
        console.log("Error while deleting Transaction", error);
        res
          .status(500)
          .json({
            success: false,
            message: "Error while deleting Transaction",
          });   
    }

}