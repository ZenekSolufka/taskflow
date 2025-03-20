import TaskItem from "./TaskItem";
const TaskList = ({
  tasks,
  toggleTask,
  removeTask,
  start,
  end,
  onComplete,
}) => {
  return (
    <div className="bg-[#393E46] py-6 pl-6 rounded-lg shadow-sm pr-[5px]">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Tasks List</h2>
      <div className="task-wrapper max-h-[240px] overflow-y-scroll custom-scrollbar">
        {tasks.length === 0 ? (
          <p className="empty-message text-gray-100">Brak zadań</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              toggleTask={toggleTask}
              removeTask={removeTask}
              task={task}
              start={start}
              end={end}
              onComplete={onComplete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
