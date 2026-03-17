"use client";

import Link from "next/link";
import { AppShell, PageShell } from "../../../components/ui";

export default function NewNotePage() {
  return (
    <AppShell>
      <PageShell
        title="Begin New Notes"
        description="Choose how you want to create your study material."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Link
            href="/notes/new/upload"
            className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-xl dark:bg-zinc-800">
                📁
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Upload Files
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Upload notes, PDFs, or documents and turn them into recall tools.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/notes/notepad"
            className="group rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <div className="space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 text-xl dark:bg-zinc-800">
                ✍️
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Type Notes
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Write your notes manually and generate flashcards and quizzes from them.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </PageShell>
    </AppShell>
  );
}