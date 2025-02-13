export default function Profile({ user, onLogout }) {
    return (
      <div className="flex items-center space-x-4">
        <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
        <span className="text-sm font-semibold">{user.name}</span>
        <button
          onClick={onLogout}
          className="text-sm text-blue-500 hover:text-blue-700"
        >
          Wyloguj
        </button>
      </div>
    );
  }
  ``
  