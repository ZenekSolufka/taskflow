export default function Profile({ user, onLogout }) {
    return (
      <div className="flex items-center gap-4">
        <img 
          src={user.picture} 
          alt="Profile" 
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{user.name}</p>
          <button 
            onClick={onLogout}
            className="text-red-500 hover:text-red-600 text-sm"
          >
            Wyloguj
          </button>
        </div>
      </div>
    );
  }