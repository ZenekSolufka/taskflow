import { useState, useEffect, useCallback } from 'react';
import AddTaskForm from '../components/AddTaskForm';
import TaskList from '../components/TaskList';
import Chart from '../components/Chart';
import MiniCalendar from '../components/MiniCalendar';
import GoogleCalendarExport from '../components/GoogleCalendarExport';
import Profile from '../components/Profile';
import useStore from '../store/useStore';

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { tasks = [], addTask } = useStore(state => state);
    
  // Inicjalizacja Google Identity Services
  useEffect(() => {
    const initGoogleAuth = () => {
        console.log('Google Identity Services loaded');
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleLoginSuccess,
        auto_select: false,
      });
    };

    if (window.google) {
      initGoogleAuth();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = initGoogleAuth;
      document.body.appendChild(script);
    }
  }, []);

  // Funkcja uruchamiająca popup logowania
  const handleLoginPopup = () => {
    window.google.accounts.id.prompt();
  };

  // Obsługa logowania
  const handleLoginSuccess = useCallback(async (response) => {
    console.log('Login Success:', response);
    try {
      setLoading(true);
      const { credential } = response;
      const userInfo = JSON.parse(atob(credential.split('.')[1]));

      setUser({
        name: userInfo.name,
        picture: userInfo.picture,
        email: userInfo.email,
      });
      setToken(credential);
      setError(null);
    } catch (err) {
      setError('Nie udało się zalogować.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Obsługa wylogowania
  const handleLogout = useCallback(() => {
    setUser(null);
    setToken(null);
    window.google.accounts.id.revoke(token, () => {
      console.log('Token revoked');
    });
  }, [token]);

  // Zapisywanie stanu użytkownika w localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  // Przywracanie stanu użytkownika po odświeżeniu
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && !user) {
      setUser(JSON.parse(savedUser));
    }
  }, [user]);

  return (
    <div className="flex-1 p-4 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Nagłówek */}
        <div className="flex justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            {user ? `Witaj, ${user.name}` : 'TaskFlow Planner'}
          </h1>

          {user ? (
            <Profile user={user} onLogout={handleLogout} />
          ) : (
            <div
              id="google-login-button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
              onClick={handleLoginPopup}  // Kliknięcie przycisku uruchamia popup
            >
              {loading ? 'Logowanie...' : 'Zaloguj przez Google'}
            </div>
          )}
        </div>

        {/* Komunikaty błędów */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Główna zawartość */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lewa kolumna - Zarządzanie zadaniami */}
          <div className="lg:col-span-2 space-y-6">
            <AddTaskForm onAddTask={addTask} />
            
            <div className="grid gap-6 md:grid-cols-2">
              <TaskList 
                title="Zadania na dziś"
                tasks={tasks.filter(task => 
                  new Date(task.date).toDateString() === new Date().toDateString()
                )}
              />
              <TaskList 
                title="Nadchodzące zadania"
                tasks={tasks.filter(task => 
                  new Date(task.date) > new Date()
                )}
              />
            </div>
          </div>

          {/* Prawa kolumna - Integracje i statystyki */}
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Integracje</h2>
              <GoogleCalendarExport token={token} />
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Statystyki</h2>
              <Chart tasks={tasks} />
            </div>

            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Kalendarz</h2>
              <MiniCalendar tasks={tasks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
