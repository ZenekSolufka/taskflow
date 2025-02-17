const TaskItem = ({ task, removeTask, toggleTask, start, end }) => {
  console.log(task.start);
  return (
    <div className="task-item">
      <span
        onClick={() => toggleTask(task.id)}
        className={`task-text ${task.completed ? "completed" : ""}`}
      >
        {task.eventName} {task.eventDescription} {start.toISOString()}{" "}
        {end.toISOString()}
      </span>
      <button className="delete-button" onClick={() => removeTask(task.id)}>
        USUŃ
      </button>
    </div>
  );
};

export default TaskItem;
