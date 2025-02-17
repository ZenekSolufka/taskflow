import TaskItem from "./TaskItem";
const TaskList = ({ tasks, toggleTask, removeTask, start, end }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4"></h2>
      <div className="task-wrapper">
        {tasks.length === 0 ? (
          <p className="empty-message">Brak zadań</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              toggleTask={toggleTask}
              removeTask={removeTask}
              task={task}
              start={start}
              end={end}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
