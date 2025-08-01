import React, { useState } from "react";

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddBudget = (e) => {
    e.preventDefault();
    if (!title || !amount || isNaN(amount)) return;

    const newBudget = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
    };

    setBudgets([newBudget, ...budgets]);
    setTitle("");
    setAmount("");
  };

  const handleDeleteBudget = (id) => {
    setBudgets(budgets.filter((item) => item.id !== id));
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        💰 Budget Manager
      </h1>

      {/* Budget Form */}
      <form
        onSubmit={handleAddBudget}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-green-100"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-green-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Amount</label>
          <input
            type="number"
            placeholder="e.g. 1500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-green-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          ➕ Add Budget
        </button>
      </form>

      {/* Budget List */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Budget Records
        </h2>

        {budgets.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No budget items added yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {budgets.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-green-50 border border-green-100 p-4 rounded-lg shadow-sm"
              >
                <span className="text-gray-800 font-medium">
                  {item.title} — ₹{item.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => handleDeleteBudget(item.id)}
                  className="text-sm text-red-600 hover:text-red-800 font-semibold"
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total Budget */}
      <div className="mt-8 p-4 bg-green-100 border border-green-200 rounded-lg text-right text-xl font-bold text-green-800 shadow-inner">
        Total Budget: ₹{totalBudget.toFixed(2)}
      </div>
    </div>
  );
};

export default Budget;
