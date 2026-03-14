"use client";

import { AppShell, PageShell } from "../../../components/ui";
import { useAuth } from "../../../components/authContext";

export default function RecallSelectPage() {
  const { user } = useAuth();

  return (
    <AppShell>
      <PageShell
        title="Select Recall Mode"
        description="Choose how you want to practice recalling your notes."
      >
        <div className="space-y-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Recall mode selection coming soon...
          </p>
        </div>
      </PageShell>
    </AppShell>
  );
}
