import { format } from "date-fns";

const TaskItem = ({ task, removeTask }) => {
  return (
    <div className=" bg-[#222831] px-4 py-4 rounded-xl mb-4 mr-4 flex justify-between items-center">
      <div className="flex flex-col  ">
        <p className=" text-gray-100 text-xl">{task.eventName}</p>
        <p className=" text-gray-100">{task.eventDescription}</p>
      </div>
      <div className="flex gap-2">
        <div className="flex items-center">
          <p className="pb-2 mt-0 text-gray-100">
            {format(task.start, "HH:mm")} - {format(task.end, "HH:mm")}
            {" / "}
            {format(task.start, "dd-MM-yyyy")}
          </p>
        </div>
        <div>
          <button
            className="bg-[#00ADB5] text-gray-100 px-2 pb-1 pt-0.25 rounded-[6px]"
            onClick={() => removeTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
