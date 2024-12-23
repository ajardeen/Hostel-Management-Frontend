import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const revenueData = [
    { _id: "Service Fee", totalAmount: 35 },
    { _id: "Laundry", totalAmount: 20 },
    { _id: "Room Booking", totalAmount: 750 },
    { _id: "Maintenance", totalAmount: 50 },
  ];

  const expensesData = [
    { _id: "Wi-Fi", totalAmount: 80 },
    { _id: "Security", totalAmount: 40 },
    { _id: "Cleaning", totalAmount: 80 },
    { _id: "Laundry", totalAmount: 25 },
    { _id: "Maintenance", totalAmount: 105 },
  ];

  // Combine labels and align revenue & expenses
  const allLabels = Array.from(
    new Set([...revenueData.map((item) => item._id), ...expensesData.map((item) => item._id)])
  );

  const revenueAmounts = allLabels.map(
    (label) => revenueData.find((item) => item._id === label)?.totalAmount || 0
  );

  const expensesAmounts = allLabels.map(
    (label) => expensesData.find((item) => item._id === label)?.totalAmount || 0
  );

  const data = {
    labels: allLabels,
    datasets: [
      {
        label: "Revenue",
        data: revenueAmounts,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: expensesAmounts,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Revenue vs Expenses",
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: "600px", margin: "0 auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
