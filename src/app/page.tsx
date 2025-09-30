// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";
import FocusCard from "./components/FocusCard";
import AddTaskModal, { TaskFormData } from "./components/AddTaskModal";

// Define a type for tasks
type Task = {
  id: number;
  title: string;
  created_at: string;
}; 

export default function HomePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getSessionAndTasks = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

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

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(tasks || []);
    }
  };

  const handleAddTask = async (taskData: TaskFormData) => {
    if (!session) return;

    const { data, error } = await supabase
      .from("tasks")
      .insert({ ...taskData, user_id: session.user.id })
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error);
    } else if (data) {
      setTasks([...tasks, data]);
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

  if (!session) return null;

  return (
    <>
      <header className="absolute top-0 right-0 p-4">
        <button
          onClick={handleSignOut}
          className="font-sans text-primary hover:underline"
        >
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
            <h2 className="font-serif text-3xl font-bold text-primary">
              All Clear!
            </h2>
            <p className="mt-2 font-sans text-lg text-primary/80">
              Click below to add your first task.
            </p>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg bg-secondary px-8 py-4 font-semibold text-primary shadow-sm hover:bg-secondary/90"
          >
            Add New Task
          </button>
        </div>
      </main>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskAdded={handleAddTask}
      />
    </>
  );
}
