"use client";

import Todos from "@/components/Todos";
import Tech from "@/components/Tech";
import { useUserContext, useUserOnRefresh } from "@/hooks/useUserContext";
import Loading from "@/components/Loading";

function HomePage() {
  const { user, setUser } = useUserContext();

  const loading = useUserOnRefresh(setUser);

  return (
    <div className="flex justify-center items-center h-full">
      <main className="w-2/4 h-4/6">
        {loading ? <Loading /> : user ? <Todos /> : <Tech />}
      </main>
    </div>
  );
}

export default HomePage;
