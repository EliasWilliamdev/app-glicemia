import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraficoGlicemia({ registros }) {
  const data = {
    labels: registros.map(r => r.data),
    datasets: [
      {
        label: 'Glicemia (mg/dL)',
        data: registros.map(r => r.valor),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Níveis de Açúcar no Sangue' }
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Gráfico dos Níveis de Glicemia</h2>
      <Line data={data} options={options} />
    </div>
  );
}

export default GraficoGlicemia;
