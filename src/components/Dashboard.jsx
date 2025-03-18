import { useState, useEffect } from "react";
import "../custom-datepicker.css";

import AddTask from "./AddTask";
import TaskList from "./TaskList";
import Chart from "./Chart";
import HomePage from "./HomePage";
import CalendarView from "./CalendarView";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Dashboard = ({ session }) => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  const { isLoading } = useSessionContext();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      return parsedTasks.map((task) => ({
        ...task,
        start: new Date(task.start), // Konwersja stringa na Date
        end: new Date(task.end),
      }));
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      eventName,
      eventDescription,
      start: start.toISOString(),
      end: end.toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id != id));
  };

  if (isLoading) {
    return <></>;
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  const createCalendarEvent = async (e) => {
    e.preventDefault();
    if (!eventName.trim() && !eventDescription.trim()) return;
    addTask(eventName, eventDescription);
    setEventName("");
    setEventDescription("");

    console.log("creating event");

    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.provider_token,
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        alert("Event create, check your google Calendar!");
      });
  };
  console.log(session);
  console.log("dane tasków", tasks);

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {session ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-15">
              <div className="bg-[#393E46] p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-100">
                  Create New Task
                </h2>
                <AddTask
                  eventName={eventName}
                  setEventName={setEventName}
                  eventDescription={eventDescription}
                  setEventDescription={setEventDescription}
                  start={start}
                  setStart={setStart}
                  end={end}
                  setEnd={setEnd}
                  addTask={addTask}
                  toggleTask={toggleTask}
                  removeTask={removeTask}
                />
                <button
                  onClick={createCalendarEvent}
                  className="w-full bg-[#00ADB5] text-white py-2 rounded-lg mt-4"
                >
                  Add to Google Calendar
                </button>
              </div>
              <TaskList
                tasks={tasks}
                toggleTask={toggleTask}
                removeTask={removeTask}
                start={start}
                end={end}
              />
            </div>
            {/* Right Column */}
            <div className="flex flex-col justify-between">
              <Chart tasks={tasks} />
              <CalendarView tasks={tasks} />
            </div>
          </div>
        ) : (
          <HomePage />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
