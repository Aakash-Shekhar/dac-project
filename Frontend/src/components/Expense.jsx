import React, { useState } from "react";

const Expense = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!description || !amount || isNaN(amount)) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
    };

    setExpenseList([newExpense, ...expenseList]);
    setDescription("");
    setAmount("");
  };

  const handleDeleteExpense = (id) => {
    const updatedList = expenseList.filter((item) => item.id !== id);
    setExpenseList(updatedList);
  };

  const totalExpense = expenseList.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-10">
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-8">
          Expense Tracker
        </h1>

        {/* Form */}
        <form
          onSubmit={handleAddExpense}
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-10"
        >
          <input
            type="text"
            placeholder="Expense Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-2 sm:col-span-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="col-span-2 sm:col-span-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            className="col-span-2 bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
          >
            + Add Expense
          </button>
        </form>

        {/* Expense List */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Expense Records
          </h2>
          {expenseList.length === 0 ? (
            <p className="text-gray-500 italic">No expenses added yet.</p>
          ) : (
            <ul className="space-y-4">
              {expenseList.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 border border-gray-200 p-4 rounded-md"
                >
                  <span className="text-gray-700 font-medium">
                    {item.description}
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="text-red-600 font-semibold">
                      ₹{item.amount.toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleDeleteExpense(item.id)}
                      className="text-sm text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Total */}
        <div className="text-right text-xl font-bold text-red-700 border-t pt-4">
          Total Expense: ₹{totalExpense.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Expense;
