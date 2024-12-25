import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ revenueData, expensesData }) => {
  const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Revenue',
        data: monthLabels.map((month) => {
          const monthData = revenueData?.find(item => item._id === month);
          return monthData ? monthData.totalAmount : 0;
        }),
        fill: false,
        borderColor: '#000000',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        pointBackgroundColor: '#000000',
        pointBorderColor: '#000000',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: monthLabels.map((month) => {
          const monthData = expensesData?.find(item => item._id === month);
          return monthData ? monthData.totalAmount : 0;
        }),
        fill: false,
        borderColor: '#FF0000',
        backgroundColor: '#ffffff',
        borderWidth: 2,
        pointBackgroundColor: '#FF0000',
        pointBorderColor: '#FF0000',
        tension: 0.1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Revenue vs Expenses',
        color: '#000000',
      },
      legend: {
        labels: {
          color: '#000000',
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          color: '#000000',
        },
      },
      y: {
        grid: {
          color: '#e0e0e0',
        },
        ticks: {
          color: '#000000',
        },
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '300px', backgroundColor: '#ffffff' }}>
      <h2 style={{ color: '#000000' }}>Revenue vs Expenses Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;