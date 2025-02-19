import { format } from "date-fns";

const TaskItem = ({ task, removeTask, start, end }) => {
  return (
    <div className="task-item flex items-start justify-between border-b-1 mb-4 mr-4">
      <div className="flex flex-col pb-4">
        <span className="task-text">{task.eventName}</span>
        <span className="task-text">{task.eventDescription}</span>
      </div>
      <button
        className="flex flex-row gap-4 items-end"
        onClick={() => removeTask(task.id)}
      >
        <span className="pb-2 mt-0">
          {format(start, "HH:mm")} - {format(end, "HH:mm")}
          {" / "}
          {format(start, "dd-MM-yyyy")}
        </span>
        <span className="bg-red-500 text-white px-2 pb-1 pt-0.25 rounded-[6px]">
          Delete
        </span>
      </button>
    </div>
  );
};

export default TaskItem;
