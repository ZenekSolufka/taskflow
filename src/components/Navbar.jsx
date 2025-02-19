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
            <p className="border-b-2">
              Hello {session.user.user_metadata.name}
            </p>
            <button
              onClick={() => signOut()}
              className="text-white px-3 pt-1 pb-2 rounded-[8px] bg-blue-500 hover:text-gray-800"
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
