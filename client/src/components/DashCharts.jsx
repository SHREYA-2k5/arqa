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

export const PopularityChart = ({ data }) => (
  <Bar 
    data={data}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          beginAtZero: true
        }
      }
    }}
  />
);

export const SlotDistributionChart = ({ data }) => (
  <Pie 
    data={data}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }}
  />
);

export const IngredientChart = ({ data }) => (
  <Bar 
    data={data}
    options={{
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          type: 'linear',
          beginAtZero: true
        }
      }
    }}
  />
);