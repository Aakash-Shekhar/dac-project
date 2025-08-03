import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import BudgetForm from '../components/budgets/BudgetForm.jsx';
import BudgetList from '../components/budgets/BudgetList.jsx';
import StatusDisplay from '../components/common/StatusDisplay.jsx';

const BudgetsPage = () => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [budgets, setBudgets] = useState([]);
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

    const fetchBudgets = async () => {
        if (categories.length === 0 && !error) {
            await fetchCategories();
        }

        setPageLoading(true);
        setError(null);
        try {
            const res = await axios.get('http://localhost:5000/budgets', {
                withCredentials: true
            });
            if (res.data.success) {
                setBudgets(res.data.budgets);
            } else {
                setError(res.data.message || 'Failed to fetch budgets.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching budgets.');
            console.error("Fetch budgets error:", err);
        } finally {
            setPageLoading(false);
        }
    };

    const handleBudgetChange = () => {
        fetchCategories();
        fetchBudgets();
    };

    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            fetchCategories();
            fetchBudgets();
        }
    }, [isAuthenticated, authLoading]);

    if (authLoading || pageLoading) {
        return <StatusDisplay type="loading" message="Loading budgets and categories..." />;
    }

    if (error) {
        return <StatusDisplay type="error" message={error} onRetry={handleBudgetChange} />;
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Set New Budget</h2>
                    <BudgetForm categories={categories} onBudgetAdded={handleBudgetChange} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Budgets</h2>
                    {budgets.length === 0 ? (
                        <StatusDisplay type="empty" message="No budgets set yet. Set one to start tracking!" emptyActionText="Set a Budget" />
                    ) : (
                        <BudgetList
                            budgets={budgets}
                            categories={categories}
                            onBudgetDeleted={handleBudgetChange}
                            onBudgetUpdated={handleBudgetChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default BudgetsPage;