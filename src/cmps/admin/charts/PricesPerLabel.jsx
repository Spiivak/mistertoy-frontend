import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { dataService } from '../../../services/data.service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Prices Per Label',
    },
  },
};

export function PricesPerLabel() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Price per Label',
        data: [],
        backgroundColor: [], // Empty array for dynamic color assignment
        type: 'bar',
        barThickness: 20, // Customize the bar width (adjust the value as needed)
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getPricesPerLabel();

        const backgroundColors = generateRandomColors(data.labels.length);

        const datasets = data.labels.map((label, index) => ({
          label,
          data: data.datasets[index].data,
          backgroundColor: backgroundColors[index],
          type: 'bar',
          barThickness: 40, // Customize the bar width (adjust the value as needed)
  
        }));

        setChartData({
          labels: data.labels,
          datasets: datasets,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function generateRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = getRandomColor();
      colors.push(color);
    }
    return colors;
  }

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="price-bar-chart">
      <Bar options={options} data={chartData} />
    </div>
  );
}

