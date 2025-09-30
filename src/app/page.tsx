// src/app/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";
import FocusCard from "./components/FocusCard";

// Define a type for our task data for type safety
type Task = {
  id: number;
  title: string;
  created_at: string;
};

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Auth and initial data fetching
    const getSessionAndTasks = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        setSession(session);
        fetchTasks(session.user);
      }
    };
    getSessionAndTasks();
  }, [router]);

  const fetchTasks = async (user: User) => {
    const { data: tasks, error } = await supabase
      .from("tasks")
      .select("id, title, created_at")
      .eq("user_id", user.id)
      .eq("is_complete", false)
      .order("created_at", { ascending: true });

    if (error) console.error("Error fetching tasks:", error);
    else setTasks(tasks || []);
  };

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim() === "" || !session) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert({ title: newTaskTitle, user_id: session.user.id })
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error);
    } else if (data) {
      setTasks([...tasks, data]);
      setNewTaskTitle("");
    }
  };

  const handleCompleteTask = async (taskId: number) => {
    const { error } = await supabase
      .from("tasks")
      .update({ is_complete: true })
      .eq("id", taskId);

    if (error) {
      console.error("Error completing task:", error);
    } else {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (!session) {
    return null; // or a loading spinner
  }

  return (
    <>
      <header className="absolute top-0 right-0 p-4">
        <button onClick={handleSignOut} className="font-sans text-primary hover:underline">
          Sign Out
        </button>
      </header>
      <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-8">
        {tasks.length > 0 ? (
          <FocusCard
            taskTitle={tasks[0].title}
            project="My Tasks"
            onComplete={() => handleCompleteTask(tasks[0].id)}
            onSnooze={() => alert("Snooze feature coming soon!")} dueDate={""}          />
        ) : (
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-primary">All Clear!</h2>
            <p className="mt-2 font-sans text-lg text-primary/80">You have no pending tasks. Add one below.</p>
          </div>
        )}
        
        <form onSubmit={handleAddTask} className="mt-8 w-full max-w-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task..."
              className="flex-grow rounded-lg border-2 border-border p-3 font-sans text-primary focus:border-secondary focus:outline-none focus:ring-0"
            />
            <button type="submit" className="rounded-lg bg-secondary px-6 py-3 font-semibold text-primary shadow-sm hover:bg-secondary/90">
              Add
            </button>
          </div>
        </form>
      </main>
    </>
  );
}