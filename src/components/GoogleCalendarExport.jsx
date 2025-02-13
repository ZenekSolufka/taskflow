import { useState } from 'react';
import GoogleLoginButton from '../components/GoogleLoginButton';
import Profile from '../pages/Profile';
import GoogleCalendarExport from '../components/GoogleCalendarExport';

export default function Dashboard() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLoginSuccess = async (response) => {
    try {
      // Pobierz dane użytkownika z Google API
      const userInfo = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
            Accept: 'application/json',
          },
        }
      ).then((res) => res.json());

      setUser({
        name: userInfo.name,
        picture: userInfo.picture,
      });
      setToken(response.access_token);
      setError(null);
    } catch (err) {
      setError('Nie udało się pobrać danych użytkownika.');
    }
  };

  const handleLoginError = () => {
    setError('Logowanie nie powiodło się. Spróbuj ponownie.');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    googleLogout();
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Hello, {user?.name || 'Guest'}</h1>
        
        {user ? (
          <Profile user={user} onLogout={handleLogout} />
        ) : (
          <GoogleLoginButton 
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <GoogleCalendarExport token={token} />
      {/* Reszta komponentów */}
    </div>
  );
}