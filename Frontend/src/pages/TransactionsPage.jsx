import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import TransactionForm from '../components/transactions/TransactionForm.jsx';
import TransactionList from '../components/transactions/TransactionList.jsx';
import StatusDisplay from '../components/common/StatusDisplay.jsx';

const TransactionsPage = () => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        setError(null);
        try {
            const res = await axios.get('http://localhost:5000/categories', {
                withCredentials: true
            });
            if (res.data.success) {
                setCategories(res.data.categories);
            } else {
                setError(res.data.message || 'Failed to fetch categories.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching categories.');
            console.error("Fetch categories error:", err);
        }
    };

    const fetchTransactions = async () => {
        if (categories.length === 0) {
            await fetchCategories();
        }

        setPageLoading(true);
        setError(null);
        try {
            const res = await axios.get('http://localhost:5000/transactions', {
                withCredentials: true
            });
            if (res.data.success) {
                setTransactions(res.data.transactions);
            } else {
                setError(res.data.message || 'Failed to fetch transactions.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching transactions.');
            console.error("Fetch transactions error:", err);
        } finally {
            setPageLoading(false);
        }
    };

    const handleDataChange = () => {
        fetchCategories();
        fetchTransactions();
    };

    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            fetchCategories();
            fetchTransactions();
        }
    }, [isAuthenticated, authLoading]);

    if (authLoading || pageLoading) {
        return <StatusDisplay type="loading" message="Loading transactions and categories..." />;
    }

    if (error) {
        return <StatusDisplay type="error" message={error} onRetry={handleDataChange} />;
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Transaction</h2>
                    <TransactionForm categories={categories} onTransactionAdded={handleDataChange} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Transactions</h2>
                    {transactions.length === 0 ? (
                        <StatusDisplay type="empty" message="No transactions added yet. Add one to see it here!" emptyActionText="Add a Transaction" />
                    ) : (
                        <TransactionList
                            transactions={transactions}
                            categories={categories}
                            onTransactionDeleted={handleDataChange}
                            onTransactionUpdated={handleDataChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;