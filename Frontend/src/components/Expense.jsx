import React, { useState, useEffect } from "react";
import axios from "axios";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const allCategories = response?.data?.categories || [];

      const expenseCategories = allCategories.filter(
        (cat) => cat.type === "expense"
      );

      setCategories(expenseCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/expense",
        {
          amount,
          note,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Expense added:", response.data);

      // Reset form
      setAmount("");
      setNote("");
      setCategory("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-md rounded-md bg-white">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Expense</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
          required
          className="w-full border rounded px-3 py-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Expense Category</option>
          {categories.length === 0 && (
            <option disabled>No categories found</option>
          )}
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default Expense;
