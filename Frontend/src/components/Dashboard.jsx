import React from "react";
import DashboardChart from "./DashboardChart";

const Dashboard = () => {
  return (
    <>
      <div className="h-full p-4">
        <h1 className="text-2xl font-bold mb-5 flex flex-col items-center">
          Dashboard
        </h1>
        <div>
          <DashboardChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
