import SignIn from "./SignIn";
import SignOut from "./SignOut";

const Navbar = ({ session, supabase }) => {
  return (
    <nav className="bg-[#393E46] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex flex-row justify-center items-center gap-2">
          <img className="w-6 h-6" src="../../assets/logoicon.png" alt="" />
          <h1 className="text-xl font-bold text-[#EEEEEE]">TaskFlow</h1>
        </div>
        {session ? (
          <SignOut supabase={supabase} />
        ) : (
          <SignIn supabase={supabase} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
