"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useAuth } from "../../components/authContext";
import { Button, TextInput, Card } from "../../components/ui";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Please enter a valid email to continue.");
      return;
    }
    setError(null);
    login(email);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <Card className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Welcome to Recallio
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Turn your notes, docs, and PDFs into recallable knowledge.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
        <p className="text-center text-xs text-zinc-600 dark:text-zinc-400">
          No account?{" "}
          <Link
            href="/signup"
            className="font-medium text-zinc-900 underline-offset-2 hover:underline dark:text-zinc-100"
          >
            Create a workspace
          </Link>
        </p>
      </Card>
    </main>
  );
}

