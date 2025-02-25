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
}) => {
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);

  return (
    <form className="task-form">
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-100 font-medium mb-1">
            Task Name
          </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-2 border border-[#242424] rounded-lg bg-[#1b1b1b]"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-100 font-medium mb-1">
            Description
          </label>
          <input
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full p-2 border border-[#242424] rounded-lg bg-[#1b1b1b]"
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
              className="w-full p-2 border rounded-lg bg-[#1b1b1b] border-[#242424] text-gray-100"
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
              className="w-full p-2 border rounded-lg bg-[#1b1b1b] border-[#242424] text-gray-100"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTask;
