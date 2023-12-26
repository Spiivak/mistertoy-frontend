import { toyService } from './toy.service';

export const dataService = {
  getPricesPerLabel,
  getInventoryByLabel,
  getRandomChartData,
};

async function getPricesPerLabel() {
  const toys = await toyService.query();
  const pricesPerLabel = {};

  toys.forEach((toy) => {
    toy.labels.forEach((label) => {
      if (!pricesPerLabel[label]) {
        pricesPerLabel[label] = [];
      }
      pricesPerLabel[label].push(toy.price);
    });
  });

  const labels = Object.keys(pricesPerLabel);
  console.log('getPricesPerLabel  labels:', labels)
  const datasets = labels.map((label) => ({
    label: label,
    data: pricesPerLabel[label],
    backgroundColor: getRandomColor(),
  }));
  console.log('datasets  datasets:', datasets)

  return { labels, datasets };
}

async function getInventoryByLabel() {
  const toys = await toyService.query();
  const inventoryByLabel = {};

  toys.forEach((toy) => {
    toy.labels.forEach((label) => {
      if (!inventoryByLabel[label]) {
        inventoryByLabel[label] = { inStock: 0, total: 0 };
      }
      inventoryByLabel[label].total++;
      if (toy.inStock) {
        inventoryByLabel[label].inStock++;
      }
    });
  });

  const labels = Object.keys(inventoryByLabel);
  const datasets = labels.map((label) => ({
    label: label,
    data: [
      (inventoryByLabel[label].inStock / inventoryByLabel[label].total) * 100,
    ],
    backgroundColor: getRandomColor(),
  }));

  return { labels, datasets };
}

function getRandomChartData() {
  const labels = Array.from({ length: 7 }, (_, i) => i + 1); // 7 days
  const datasets = [
    {
      label: 'Random Data',
      data: Array.from({ length: 7 }, () =>
        Math.floor(Math.random() * 100)
      ),
      borderColor: getRandomColor(),
      fill: false,
    },
  ];

  return { labels, datasets };
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
