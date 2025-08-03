import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import CategoryForm from '../components/categories/CategoryForm.jsx';
import CategoryList from '../components/categories/CategoryList.jsx';
import StatusDisplay from '../components/common/StatusDisplay.jsx';

const CategoriesPage = () => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        setPageLoading(true);
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
        } finally {
            setPageLoading(false);
        }
    };

    const handleCategoryChange = () => {
        fetchCategories();
    };

    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            fetchCategories();
        }
    }, [isAuthenticated, authLoading]);

    if (authLoading || pageLoading) {
        return <StatusDisplay type="loading" message="Loading categories..." />;
    }

    if (error) {
        return <StatusDisplay type="error" message={error} onRetry={fetchCategories} />;
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Category</h2>
                    <CategoryForm onCategoryAdded={handleCategoryChange} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md md:col-span-1">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Categories</h2>
                    {categories.length === 0 ? (
                        <StatusDisplay type="empty" message="No categories added yet. Add one to get started!" emptyActionText="Add a Category" />
                    ) : (
                        <CategoryList
                            categories={categories}
                            onCategoryDeleted={handleCategoryChange}
                            onCategoryUpdated={handleCategoryChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;