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
      text: 'Inventory by Labels (Percentage of Toys In Stock)',
    },
  },
};

export function InvByLabel() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Percentage of Toys In Stock',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataService.getInventoryByLabel();
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
    <div className="inventory-bar-chart">
      <Bar options={options} data={chartData} />
    </div>
  );
}
