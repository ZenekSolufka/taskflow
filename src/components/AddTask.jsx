import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../custom-datepicker.css";

const AddTask = ({
  eventName,
  setEventName,
  eventDescription,
  setEventDescription,
  start,
  setStart,
  end,
  setEnd,
}) => {
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);

  return (
    <form className="task-form">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#EEEEEE] font-medium mb-1">
            Task Name
          </label>
          <input
            placeholder="Enter task name"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-2 border border-[#00ADB5] rounded-lg bg-[#EEEEEE] text-black"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-100 font-medium mb-1">
            Description
          </label>
          <input
            placeholder="Enter task description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full p-2 border border-[#00ADB5] rounded-lg bg-[#EEEEEE] text-black"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-100">
              Start Time
            </label>
            <DatePicker
              selected={start}
              onChange={(date) => setStart(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className="w-full p-2 border rounded-lg bg-[#EEEEEE] border-[#00ADB5] text-black"
              popperClassName="custom-datepicker-popup"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-100">
              End Time
            </label>
            <DatePicker
              selected={end}
              onChange={(date) => setEnd(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className="w-full p-2 border rounded-lg bg-[#EEEEEE] border-[#00ADB5] text-black"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTask;
