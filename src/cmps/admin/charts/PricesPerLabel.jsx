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
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getPricesPerLabel();
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
    <div className="price-bar-chart">
      <Bar options={options} data={chartData} />
    </div>
  );
}
