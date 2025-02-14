import { useState, useEffect } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { XMarkIcon } from '@heroicons/react/24/solid';

ChartJS.register(CategoryScale, LinearScale, BarElement);

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <></>
  }

  // Logowanie przez Google
  async function googleSingIn() {
    const {error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options : {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase")
      console.log(error);
    }
  }

  // Wylogowanie
  async function singOut() {
    await supabase.auth.singOut();
  }

  // Tworzenie zadania
  async function createCalendarEvent() {
    console.log('creating event');
    const event = {
      'summary': eventName,
      'description': eventDescription,
      'start': {
        'dateTime': start.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      'end': {
        'dateTime': end.toISOString(),
        'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    }
    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + session.provider_token
      },
      body: JSON.stringify(event)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      alert("Event create, check your google Calendar!")
    });
  }
  // Filtrowanie zadań
  const todayTasks = tasks.filter(task => 
    new Date(task.start).toDateString() === new Date().toDateString()
  );

  const upcomingTasks = tasks.filter(task => 
    new Date(task.start) > new Date()
  );

  // Wykres zadań
  const taskCountByDate = tasks.reduce((acc, task) => {
    const date = new Date(task.start).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(taskCountByDate),
    datasets: [{
      label: 'Liczba zadań',
      data: Object.values(taskCountByDate),
      backgroundColor: '#3B82F6'
    }]
  };

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  console.log(session);
  console.log(start);
  console.log(eventName);
  console.log(eventDescription);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">TaskFlow</h1>
          {session ? (
            <div className="flex items-center space-x-4">
              <img 
                src={session.user.user_metadata.avatar_url} 
                alt="Profile" 
                className="w-8 h-8 rounded-full"
              />
              <button 
                onClick={() => singOut()}
                className="text-gray-600 hover:text-gray-800"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
            onClick={() => googleSingIn()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Sign In with Google
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {session ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
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
                    onClick={() => createCalendarEvent()}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                  >
                    Add to Google Calendar
                  </button>
                </div>
              </div>

              {/* Zadania na dziś */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Zadania na dziś</h2>
                <ul className="space-y-2">
                  {todayTasks.map((task, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(task.start).toLocaleTimeString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nadchodzące zadania */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Nadchodzące zadania</h2>
                <ul className="space-y-2">
                  {upcomingTasks.map((task, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(task.start).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Wykres zadań</h2>
                <Bar data={chartData} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Welcome to TaskFlow</h2>
            <p className="text-gray-600 mb-8">Please sign in to manage your tasks</p>
            <button
              onClick={() => googleSingIn()}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Sign In with Google
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;