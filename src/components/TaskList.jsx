import TaskItem from "./TaskItem";
const TaskList = ({ tasks, toggleTask, removeTask, start, end }) => {
  return (
    <div className="bg-white py-6 pl-6 rounded-lg shadow-sm pr-[5px]">
      <h2 className="text-lg font-semibold mb-4">Tasks List</h2>
      <div className="task-wrapper max-h-100 overflow-y-scroll custom-scrollbar">
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
