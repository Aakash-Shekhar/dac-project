import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

import StatusDisplay from '../components/common/StatusDisplay.jsx';

ChartJS.register(...registerables);

const DashboardPage = () => {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [barChartData, setBarChartData] = useState(null);
  const [doughnutChartData, setDoughnutChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchChartData = async () => {
    setDashboardLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:5000/transactions/charts-data', {
        withCredentials: true
      });

      if (res.data.success) {
        setBarChartData(res.data.barChartData);
        setDoughnutChartData(res.data.doughnutChartData);
        setLineChartData(res.data.lineChartData);
      } else {
        setError(res.data.message || 'Failed to load dashboard data.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching dashboard data.');
      console.error("Dashboard data fetch error:", err);
    } finally {
      setDashboardLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      fetchChartData();
    }
  }, [isAuthenticated, authLoading]);

  if (authLoading) {
    return <StatusDisplay type="loading" message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (dashboardLoading) {
    return <StatusDisplay type="loading" message="Loading your dashboard data..." />;
  }

  if (error) {
    return <StatusDisplay type="error" message={error} onRetry={fetchChartData} />;
  }

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-[450px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Income vs. Expense Overview (This Year)</h2>
          {barChartData?.labels?.length > 0 && barChartData?.datasets[0]?.data.some(d => d > 0) ? (
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false },
                },
              }}
              className="w-full h-full"
            />
          ) : (
            <StatusDisplay type="empty" message="No income/expense data for charts yet. Add some transactions!" emptyActionText="Add Transactions" emptyActionPath="/transactions" />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center h-[450px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Expenses by Category (Current Month)</h2>
          {doughnutChartData?.labels?.length > 0 && doughnutChartData?.datasets[0]?.data.some(d => d > 0) ? (
            <Doughnut
              data={doughnutChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'right' },
                  title: { display: false },
                },
              }}
              className="w-full h-full"
            />
          ) : (
            <StatusDisplay type="empty" message="No expense data for this month. Add some expenses!" emptyActionText="Add Transactions" emptyActionPath="/transactions" />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-2 flex flex-col items-center justify-center h-[450px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Income Trend (This Year)</h2>
          {lineChartData?.labels?.length > 0 && lineChartData?.datasets[0]?.data.some(d => d > 0) ? (
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: false },
                },
              }}
              className="w-full h-full"
            />
          ) : (
            <StatusDisplay type="empty" message="No income data for charts yet. Add some income transactions!" emptyActionText="Add Transactions" emptyActionPath="/transactions" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;