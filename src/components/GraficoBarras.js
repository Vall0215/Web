import React, { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoBarras = ({ momentoMax, momentoRes }) => {
  const data = {
    labels: ['Momento Máximo (Mₘáx)', 'Momento Resistente (M₍res₎)'],
    datasets: [
      {
        label: 'Comparación de Momentos',
        data: [momentoMax, momentoRes],
        backgroundColor: ['#4CAF50', '#FF5733'], 
        borderColor: ['#388E3C', '#D32F2F'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Comparación de Momentos (kN·m)',
        font: {
          size: 16,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  useEffect(() => {}, [momentoMax, momentoRes]);

  return (
    <div className="mt-6">
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraficoBarras;
