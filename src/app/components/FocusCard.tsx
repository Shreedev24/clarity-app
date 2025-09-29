// src/components/FocusCard.tsx
"use client";

import React from 'react';

interface FocusCardProps {
  taskTitle: string;
  project?: string;
  dueDate?: string;
  onComplete: () => void;
  onSnooze: () => void;
}

const FocusCard: React.FC<FocusCardProps> = ({ 
  taskTitle, 
  project, 
  dueDate, 
  onComplete, 
  onSnooze 
}) => {
  return (
    <section 
      className="w-full max-w-lg rounded-xl border border-border bg-white p-6 sm:p-8 shadow-sm"
      aria-labelledby="focus-card-title"
    >
      <div className="flex flex-col items-center text-center">
        
        {project && (
          <p className="mb-3 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-primary">
            {project}
          </p>
        )}
        
        <h2 id="focus-card-title" className="font-serif text-3xl font-bold text-primary">
          {taskTitle}
        </h2>
        
        {dueDate && (
          <p className="mt-2 font-sans text-base text-primary/70">
            Due: {dueDate}
          </p>
        )}
        
        <div className="mt-8 flex w-full flex-col sm:flex-row sm:justify-center gap-4">
          
          <button 
            onClick={onComplete}
            className="w-full rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors"
            aria-label={`Mark task as complete: ${taskTitle}`}
          >
            ✓ Complete
          </button>
          
          <button 
            onClick={onSnooze}
            className="w-full sm:w-auto rounded-lg border-2 border-border bg-transparent px-6 py-3 font-semibold text-primary hover:bg-border/40 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-colors"
            aria-label="Snooze this task"
          >
            Snooze
          </button>
        </div>

      </div>
    </section>
  );
};

export default FocusCard;