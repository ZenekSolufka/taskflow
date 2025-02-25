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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff", // Kolor tekstu legendy
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleColor: "#ffcc00", // Kolor tytułu tooltipa
        bodyColor: "#ffffff", // Kolor tekstu w tooltipie
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Tło tooltipa
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // Kolor etykiet na osi X
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Kolor linii siatki (X)
        },
      },
      y: {
        ticks: {
          stepSize: 1,
          color: "#ffffff", // Kolor etykiet na osi Y
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Kolor linii siatki (Y)
        },
      },
    },
  };

  const chartData = {
    labels: Object.keys(taskCountByDate(tasks)),

    datasets: [
      {
        label: "Liczba zadań",
        data: Object.values(taskCountByDate(tasks)),
        borderColor: "#baa100", // Kolor linii
        backgroundColor: "oklch(0.852 0.199 91.936)",
        tension: 0.3, // Kolor wypełnienia pod linią
        borderWidth: 2, // Grubość linii
        pointRadius: 3, // Rozmiar punktów
        pointBackgroundColor: "oklch(0.852 0.199 91.936)", // Kolor punktów
        fill: true, // Wypełnienie pod linią
      },
    ],
  };

  console.log("Chart data:", chartData);

  return (
    <div className="space-y-6">
      <div className="bg-[#131313] p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">
          Wykres zadań
        </h2>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
