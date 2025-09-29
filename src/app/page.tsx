"use client";

import FocusCard from "./components/FocusCard"; 

export default function HomePage() {
  const handleComplete = () => {
    alert("Task completed! (Functionality to come)");
  };

  const handleSnooze = () => {
    alert("Task snoozed! (Functionality to come)");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 sm:p-8">
      <FocusCard
        taskTitle="Set up Supabase Backend"
        project="Clarity App MVP"
        dueDate="Today"
        onComplete={handleComplete}
        onSnooze={handleSnooze}
      />
    </main>
  );
}
