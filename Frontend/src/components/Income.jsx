import React, { useState } from "react";

const Income = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleAddIncome = (e) => {
    e.preventDefault();
    if (!description || !amount || isNaN(amount)) return;

    const newIncome = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
    };

    setIncomeList([newIncome, ...incomeList]);
    setDescription("");
    setAmount("");
  };

  const handleDeleteIncome = (id) => {
    const updatedList = incomeList.filter((item) => item.id !== id);
    setIncomeList(updatedList);
  };

  const totalIncome = incomeList.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-700">
        Income Tracker
      </h1>

      {/* Form */}
      <form
        onSubmit={handleAddIncome}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="e.g. Freelance work"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 w-full"
        >
          Add Income
        </button>
      </form>

      {/* Income List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Income Records
        </h2>
        {incomeList.length === 0 ? (
          <p className="text-gray-500 italic">No income records added yet.</p>
        ) : (
          <ul className="space-y-3">
            {incomeList.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded-md shadow-sm border border-gray-200"
              >
                <div className="text-gray-700 font-medium">
                  {item.description}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-green-600 font-semibold">
                    ₹{item.amount}
                  </span>
                  <button
                    onClick={() => handleDeleteIncome(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Total Income */}
      <div className="mt-10 text-right text-xl font-bold text-indigo-700">
        Total Income: ₹{totalIncome}
      </div>
    </div>
  );
};

export default Income;
