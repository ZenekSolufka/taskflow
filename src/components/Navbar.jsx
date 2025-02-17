const Navbar = ({ session, supabase }) => {
  async function googleSingIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar",
      },
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
    console.log("OAuth data:", data);
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
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
              onClick={() => signOut()}
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
  );
};

export default Navbar;
