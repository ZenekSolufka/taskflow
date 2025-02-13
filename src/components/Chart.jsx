import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import useStore from '../store/useStore';

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function Chart() {
  const tasks = useStore((state) => state.tasks);

  // Przygotowanie danych
  const taskCountByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(taskCountByDate),
    datasets: [{
      label: 'Liczba zadań',
      data: Object.values(taskCountByDate),
      backgroundColor: '#3B82F6'
    }]
  };

  return <Bar data={data} />;
}