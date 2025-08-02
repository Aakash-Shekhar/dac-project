const Category = require("../models/Category");


//create Category
exports.createCategory = async (req, res) => {
    const userid = req.user.id;
    const { name, type } = req.body;

    try {
         if (!name || !type) {
           return res
             .status(400)
             .json({ success: false, message: "Name and Type are required" });
         }

         if (!["income", "expense"].includes(type)) {
           return res
             .status(400)
             .json({
               success: false,
               message: "Type must be 'income' or 'expense'",
             });
        }
        
        const newCategory = await Category.create({ userid, name, type });
        return res.status(201).json({ success: true, newCategory });
    } catch (error) {
        console.log("Error while creating new Category")
        return res.status(500).json({
          success: false,
          message: "Error while creating new Category",
        });
    }
}

//get All Categories
exports.getAllCategories = async (req, res) => {
    const userid = req.user.id;

    try {
        const categories = await Category.find({ userid });
        return res.status(200).json({ success: true, categories });
    } catch (error) {
        console.log("Error while getting Categories");
        res
          .status(500)
          .json({ success: false, message: "Error while getting Categories" });
    }
}

//update Categories
exports.updateCategory = async (req, res) => {
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

        const updateCategory = await Category.findByIdAndUpdate({ _id: id, userid }, req.body, { new: true });

        if (!updateCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        return res.status(200).json({ success: true, updateCategory });
    } catch (error) {
        console.log("Error while updating category");
        return res
          .status(500)
          .json({ success: false, message: "Error while updating category" });
    }
}


//delete a category
exports.deleteCategory = async (req, res) => {
    const userid = req.user.id;
    const { id } = req.params;

    try {
        const deleteCategory = await Category.findByIdAndDelete({ _id: id, userid });
        if (!deleteCategory) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        return res.status(200).json({ success: true, message: "Category deleted Successfully" });
    } catch (error) {
        console.log("Error while deleting Category");
        res
          .status(500)
          .json({ success: false, message: "Error while deleting Category" });
        
    }
}