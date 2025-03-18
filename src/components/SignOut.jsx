const SignOut = ({ supabase }) => {
  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={() => signOut()}
        className="text-white px-3 pt-1 pb-2 rounded-[8px] bg-[#00ADB5] hover:bg-yellow-500"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
