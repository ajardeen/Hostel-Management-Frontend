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
        backgroundColor: "rgba(53, 162, 235, 0.8)",
        borderColor: "rgba(53, 162, 235, 1)",
        borderWidth: 2,
      },
      {
        label: "Expenses",
        data: expensesAmounts,
        backgroundColor: "rgba(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Revenue vs Expenses",
        font: {
          size: 20,
          weight: 'bold'
        },
        color: '#2c3e50'
      },
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14
          },
          usePointStyle: true,
          padding: 20
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div style={{ 
      width: "800px", 
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;