import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";
import AdminManagementSystem from "@/components/AdminManagementSystem";

export default function Page() {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession(); // Updated method to get the session
      setSession(session);

      if (!session) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    };
    getSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // Redirect to login after logout
  };

  if (!session) return null;

  return (
    <div className="container max-auto">
      <AdminManagementSystem />
      <div className="flex justify-center my-6">
        <button
          onClick={handleLogout}
          className=" bg-red-500 text-white  px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
