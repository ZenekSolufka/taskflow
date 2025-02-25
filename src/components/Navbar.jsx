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
    <nav className="bg-[#1b1b1b] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-2">
          <img className="w-6 h-6" src="../../assets/logoicon.png" alt="" />
          <h1 className="text-xl font-bold text-gray-100">TaskFlow</h1>
        </div>
        {session ? (
          <div className="flex items-center space-x-4">
            <p className="border-b-2">
              Hello {session.user.user_metadata.name}
            </p>
            <button
              onClick={() => signOut()}
              className="text-white px-3 pt-1 pb-2 rounded-[8px] bg-yellow-400 hover:bg-yellow-500"
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
