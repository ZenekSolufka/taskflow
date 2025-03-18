import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  const supabase = useSupabaseClient();
  const session = useSession();
  return (
    <div className="min-h-screen bg-[#222831]">
      <Navbar session={session} supabase={supabase} />
      <Dashboard session={session} />
    </div>
  );
}

export default App;
