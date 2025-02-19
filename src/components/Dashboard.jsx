import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import Chart from "./Chart";
import HomePage from "./HomePage";
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const session = useSession();
  const supabase = useSupabaseClient();
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

  async function createCalendarEvent() {
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
  }

  console.log(session);

  return (
    <>
      <Navbar session={session} supabase={supabase} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {session ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
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
                  onClick={() => createCalendarEvent()}
                  className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-4"
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
            <Chart tasks={tasks} />
          </div>
        ) : (
          <HomePage />
        )}
      </main>
    </>
  );
};

export default Dashboard;
