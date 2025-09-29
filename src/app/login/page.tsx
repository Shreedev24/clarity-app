// src/app/login/page.tsx
"use client";

import { supabase } from "@/lib/supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          router.push("/"); // Redirect to home page on successful login
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="w-full max-w-md rounded-lg border border-border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center font-serif text-3xl font-bold text-primary">
          Welcome to Clarity
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#192A51", // Our primary navy blue
                  brandAccent: "#2d4b8f", // A lighter navy for hover
                },
              },
            },
          }}
          providers={[]} // We are only using email auth for now
          theme="light"
        />
      </div>
    </main>
  );
}