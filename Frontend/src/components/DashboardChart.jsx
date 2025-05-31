import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

const DashboardChart = () => {
  return (
    <div className="p-4">
      <div className="h-96 flex flex-col items-center mb-8">
        <Bar
          data={{
            labels: ["A", "B", "C"],
            datasets: [
              {
                label: "Income",
                data: [200, 300, 400],
                backgroundColor: "rgba(75, 192, 192, 0.5)",
              },
              {
                label: "Expense",
                data: [100, 200, 300],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="h-96 w-full md:w-1/2">
          <Doughnut
            data={{
              labels: ["Food", "Rent", "Travel"],
              datasets: [
                {
                  label: "Expenses",
                  data: [200, 300, 400],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                  ],
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>

        <div className="h-96 w-full md:w-1/2">
          <Line
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
              datasets: [
                {
                  label: "Income Trend",
                  data: [65, 59, 80, 81, 56, 55, 40],
                  borderColor: "rgb(75, 192, 192)",
                  fill: false,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
