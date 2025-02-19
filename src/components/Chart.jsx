import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ tasks }) => {
  console.log("Tasks in Chart:", tasks);

  const taskCountByDate = (tasks) => {
    const counts = tasks.reduce((acc, task) => {
      const date = new Date(task.start).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
    console.log("Task counts by date:", counts);
    return counts;
  };

  const chartData = {
    labels: Object.keys(taskCountByDate(tasks)),
    datasets: [
      {
        label: "Liczba zadań",
        data: Object.values(taskCountByDate(tasks)),
        borderColor: "#3B82F6", // Kolor linii
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3, // Kolor wypełnienia pod linią
        borderWidth: 2, // Grubość linii
        pointRadius: 3, // Rozmiar punktów
        pointBackgroundColor: "#3B82F6", // Kolor punktów
        fill: true, // Wypełnienie pod linią
      },
    ],
  };

  console.log("Chart data:", chartData);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Wykres zadań</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Chart;
