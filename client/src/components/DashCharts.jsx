import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register all required components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

// Define your color palette
const colorPalette = {
  orange: {
    primary: 'rgba(237, 137, 54, 1)',       // orange-500
    light: 'rgba(254, 243, 199, 1)',       // orange-100 
    dark: 'rgba(194, 65, 12, 1)',          // orange-700
    muted: 'rgba(251, 211, 141, 1)'        // orange-300
  },
  complementary: {
    teal: 'rgba(45, 212, 191, 1)',         // teal-400
    slate: 'rgba(100, 116, 139, 1)',       // slate-500
    amber: 'rgba(245, 158, 11, 1)'         // amber-500
  }
};

export const PopularityChart = ({ data }) => {
  const chartData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: colorPalette.orange.primary,
      hoverBackgroundColor: colorPalette.orange.dark,
      borderColor: colorPalette.orange.light,
      borderWidth: 1
    }))
  };

  return (
    <Bar 
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            type: 'linear',
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#4b5563' // gray-600
            }
          }
        }
      }}
    />
  );
};

export const SlotDistributionChart = ({ data }) => {
  const pieColors = [
    colorPalette.orange.primary,
    colorPalette.complementary.teal,
    colorPalette.complementary.slate,
    colorPalette.complementary.amber,
    colorPalette.orange.muted,
    colorPalette.orange,
  ];

  const chartData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: pieColors,
      borderColor: '#fff',
      borderWidth: 1,
      hoverOffset: 4
    }))
  };

  return (
    <Pie 
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#4b5563', // gray-600
              padding: 20
            }
          },
          tooltip: {
            bodyColor: '#fff', //color of the hover thing body
            titleColor: '#fff', //color of the hover thing title
            displayColors: true,
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}%`;
              }
            }
          }
        }
      }}
    />
  );
};

export const IngredientChart = ({ data }) => {
  const chartData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: colorPalette.orange.muted,
      hoverBackgroundColor: colorPalette.orange.primary,
      borderColor: colorPalette.orange.light,
      borderWidth: 1
    }))
  };

  return (
    <Bar 
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', // Horizontal bar chart
        scales: {
          x: {
            type: 'linear',
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }}
    />
  );
};