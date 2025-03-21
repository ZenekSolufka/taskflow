const SignIn = ({ supabase }) => {
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

  return (
    <button
      onClick={() => googleSingIn()}
      className="max-w-[220px] bg-[#00ADB5] hover:bg-[#454b54] text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        viewBox="0 0 488 512"
        className="mr-2"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
      </svg>{" "}
      Sign In with Google
    </button>
  );
};

export default SignIn;
