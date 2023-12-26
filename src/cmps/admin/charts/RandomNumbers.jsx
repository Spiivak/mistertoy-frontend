import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { dataService } from '../../../services/data.service';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Random Numbers',
    },
  },
};

export function RandomNumbers() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Random Dataset',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getRandomChartData();
        setChartData({
          labels: data.labels,
          datasets: data.datasets,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="random-numbers-chart">
      <Bar options={options} data={chartData} />
    </div>
  );
}
