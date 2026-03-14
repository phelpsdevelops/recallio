"use client";

import { AppShell, PageShell } from "../../../components/ui";
import { useAuth } from "../../../components/authContext";

export default function NewNotePage() {
  const { user } = useAuth();

  return (
    <AppShell>
      <PageShell
        title="Begin New Notes"
        description="Start typing or upload a file to create recall tools."
      >
        <div className="space-y-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Note creation interface coming soon...
          </p>
        </div>
      </PageShell>
    </AppShell>
  );
}
