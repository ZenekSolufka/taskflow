import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Chart = () => {
  const taskCountByDate = ({ tasks }) =>
    tasks.reduce((acc, task) => {
      const date = new Date(task.start).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

  const chartData = {
    labels: Object.keys(taskCountByDate),
    datasets: [
      {
        label: "Liczba zadań",
        data: Object.values(taskCountByDate),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Wykres zadań</h2>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Chart;
