// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import FocusCard from "./components/FocusCard";

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      } else {
        setSession(data.session);
      }
    };
    getSession();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleComplete = () => alert("Task completed!");
  const handleSnooze = () => alert("Task snoozed!");

  // Render a loading state or nothing while checking the session
  if (!session) {
    return null;
  }

  return (
    <>
      <header className="absolute top-0 right-0 p-4">
        <button onClick={handleSignOut} className="font-sans text-primary hover:underline">
          Sign Out
        </button>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
        <FocusCard
          taskTitle="Implement Real-time Database"
          project="Clarity App MVP"
          dueDate="Next"
          onComplete={handleComplete}
          onSnooze={handleSnooze}
        />
      </main>
    </>
  );
}