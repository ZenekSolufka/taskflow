export default function TaskList({ title, tasks }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
              </div>
              <span className="text-gray-500">{new Date(task.date).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  