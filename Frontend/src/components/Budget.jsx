import React, { useState, useEffect } from "react";
import axios from "axios";

const Budget = () => {
  const [budgets, setBudgets] = useState([]);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [period, setPeriod] = useState("monthly");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token"); // ✅ store token during login

  // Fetch budgets from backend
  const fetchBudgets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/budgets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBudgets(res.data.budgets);
    } catch (err) {
      setError("Failed to fetch budgets.");
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleAddBudget = async (e) => {
    e.preventDefault();

    if (!category || !limit || !period || !startdate || !enddate) {
      setError("Please fill all fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/budgets",
        {
          category,
          limit: Number(limit),
          period,
          startdate,
          enddate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBudgets([res.data.budget, ...budgets]);
      setCategory("");
      setLimit("");
      setPeriod("monthly");
      setStartdate("");
      setEnddate("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating budget");
    }
  };

  const handleDeleteBudget = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/budgets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBudgets(budgets.filter((b) => b._id !== id));
    } catch (err) {
      setError("Error deleting budget");
    }
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);

  return (
    <div className="p-6 sm:p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        💰 Budget Manager
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleAddBudget}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 border border-green-100"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Category ID
          </label>
          <input
            type="text"
            placeholder="MongoDB Category ID"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-green-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Limit</label>
          <input
            type="number"
            placeholder="e.g. 1500"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="w-full border border-green-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full border border-green-300 p-2 rounded-md"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={startdate}
            onChange={(e) => setStartdate(e.target.value)}
            className="w-full border border-green-300 p-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            End Date
          </label>
          <input
            type="date"
            value={enddate}
            onChange={(e) => setEnddate(e.target.value)}
            className="w-full border border-green-300 p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
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
            No budget items yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {budgets.map((item) => (
              <li
                key={item._id}
                className="flex justify-between items-center bg-green-50 border border-green-100 p-4 rounded-lg shadow-sm"
              >
                <div>
                  <p className="text-gray-800 font-medium">
                    Category: {item.category?.name || item.category}
                  </p>
                  <p>Period: {item.period}</p>
                  <p>
                    ₹{item.limit} |{" "}
                    {new Date(item.startdate).toLocaleDateString()} -{" "}
                    {new Date(item.enddate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDeleteBudget(item._id)}
                  className="text-sm text-red-600 hover:text-red-800 font-semibold"
                >
                  ❌ Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 p-4 bg-green-100 border border-green-200 rounded-lg text-right text-xl font-bold text-green-800 shadow-inner">
        Total Budget: ₹{totalBudget.toFixed(2)}
      </div>
    </div>
  );
};

export default Budget;
