import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddTask = ({
  eventName,
  setEventName,
  eventDescription,
  setEventDescription,
  start,
  setStart,
  end,
  setEnd,
  addTask,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventName.trim() && !eventDescription.trim()) return;
    addTask(eventName);
    setEventName("");
    setEventDescription("");
  };

  console.log(start);
  console.log(eventName);
  console.log(eventDescription);

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Task Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <DatePicker
              selected={start}
              onChange={(date) => setStart(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <DatePicker
              selected={end}
              onChange={(date) => setEnd(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add new Task
        </button>
      </div>
    </form>
  );
};

export default AddTask;
