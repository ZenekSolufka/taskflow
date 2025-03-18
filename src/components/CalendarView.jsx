import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar"; // Import CustomToolbar

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = ({ tasks }) => {
  const events = tasks.map((task) => ({
    title: task.eventName,
    start: new Date(task.start),
    end: new Date(task.end),
  }));

  return (
    <div className="bg-[#393E46] p-4 rounded-lg shadow-sm mt-4">
      <h2 className="text-lg text-white font-semibold mb-4">Task Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          toolbar: CustomToolbar, // Use CustomToolbar
        }}
        views={["month"]} // Only show month view
      />
    </div>
  );
};

export default CalendarView;
