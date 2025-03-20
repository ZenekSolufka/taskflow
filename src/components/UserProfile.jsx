const UserProfile = ({ session, tasks, completedTasksCount }) => {
  if (!session?.user) return null;

  const user = session.user;
  const userEmail = user.email;
  const userName = userEmail.split("@")[0];

  // Przykładowe dane (w rzeczywistej aplikacji pobierane z bazy danych)
  const userStats = {
    memberSince: "2024-01-15",
  };

  let successRate = (completedTasksCount / tasks.length) * 100 + "%";

  return (
    <div className="flex flex-col p-6 bg-[#393E46] text-white rounded-xl space-y-6">
      {/* Górna sekcja z podstawowymi informacjami */}
      <div className="flex items-center space-x-6 max-w-3xl w-full">
        <div className="flex-shrink-0 relative group">
          <div className="w-20 h-20 rounded-full bg-[#00ADB5] flex items-center justify-center text-2xl font-bold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <button className="absolute bottom-0 right-0 bg-[#00ADB5] p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
            </svg>
          </button>
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold">{userName}</h2>
            <span className="bg-[#00ADB5] px-2 py-0.5 rounded-full text-xs">
              Pro User
            </span>
          </div>
          <p className="text-gray-300">{userEmail}</p>
          <div className="mt-2 flex space-x-4">
            <div className="text-sm">
              <span className="text-[#00ADB5] font-medium">Last login:</span>
              <span className="ml-2">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="text-sm">
              <span className="text-[#00ADB5] font-medium">Member since:</span>
              <span className="ml-2">{userStats.memberSince}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dolna sekcja ze statystykami */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-600">
        <div className="text-center">
          <div className="text-2xl font-bold text-[#00ADB5]">
            {completedTasksCount}
          </div>
          <div className="text-sm text-gray-300">Tasks Completed</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-[#00ADB5]">
            {tasks.length}
          </div>
          <div className="text-sm text-gray-300">Pending Tasks</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#00ADB5]">{successRate}</div>
          <div className="text-sm text-gray-300">Success Rate</div>
        </div>
      </div>

      {/* Przyciski akcji */}
      <div className="flex space-x-4 pt-4 border-t border-gray-600">
        <button className="flex items-center space-x-2 px-4 py-2 bg-[#00ADB5] rounded-lg hover:bg-opacity-80 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span>Edit Profile</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 rounded-lg hover:bg-opacity-80 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
