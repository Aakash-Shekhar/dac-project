import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiDollarSign, FiCalendar, FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaRupeeSign } from 'react-icons/fa';
import { ImSpinner2 } from 'react-icons/im';

const TransactionForm = ({ categories, onTransactionAdded }) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredCategories = categories.filter(cat => cat.type === type);

  useEffect(() => {
    if (!filteredCategories.some(cat => cat._id === category)) {
      setCategory('');
    }
  }, [type, filteredCategories, category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!amount || !category || !date) {
      setError('Please fill all required fields: Amount, Category, and Date.');
      setIsLoading(false);
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError('Amount must be a positive number.');
      setIsLoading(false);
      return;
    }
    if (!category) {
      setError('Please select a valid category.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/transactions', {
        type,
        amount: parseFloat(amount),
        category,
        description,
        date,
        recurring
      }, { withCredentials: true });

      if (res.data.success) {
        console.log('Transaction added:', res.data.transaction);
        onTransactionAdded();
        setAmount('');
        setCategory('');
        setDescription('');
        setDate('');
        setRecurring(false);
      } else {
        setError(res.data.message || 'Failed to add transaction.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding transaction.');
      console.error("Add transaction error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-red-600 bg-red-50 p-2 rounded-md text-sm text-center border border-red-200">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="type" className="block text-gray-700 font-medium mb-1">Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="block text-gray-700 font-medium mb-1">Amount</label>
        <div className="relative">
          <FaRupeeSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            id="amount"
            type="number"
            placeholder="e.g., 100.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="block text-gray-700 font-medium mb-1">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select a {type} category</option>
          {filteredCategories.length > 0 ? (
            filteredCategories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))
          ) : (
            <option value="" disabled>No {type} categories available. Please create one.</option>
          )}
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-gray-700 font-medium mb-1">Description (Optional)</label>
        <textarea
          id="description"
          placeholder="e.g., Dinner with friends"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="2"
        ></textarea>
      </div>

      <div>
        <label htmlFor="date" className="block text-gray-700 font-medium mb-1">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex items-center">
        <input
          id="recurring"
          type="checkbox"
          checked={recurring}
          onChange={(e) => setRecurring(e.target.checked)}
          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="recurring" className="text-gray-700">Recurring Transaction</label>
      </div>

      <button
        type="submit"
        className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200
                     ${isLoading ? 'opacity-60 cursor-not-allowed flex items-center justify-center gap-2' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? <><ImSpinner2 className="animate-spin" /> Adding...</> : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;