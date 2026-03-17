"use client";

import { AppShell, PageShell, Card, Button } from "../../../components/ui";
import { useAuth } from "../../../components/authContext";

const recallOptions = [
  {
    key: "quiz",
    title: "Quiz",
    description: "Test your understanding with generated questions.",
  },
  {
    key: "finish-statement",
    title: "Finish the Statement",
    description: "Practice recalling missing parts of your notes.",
  },
  {
    key: "flashcards",
    title: "Flashcards",
    description: "Review concepts with quick active recall cards.",
  },
  {
    key: "speak-recallai",
    title: "Speak to recallAI",
    description: "Practice by talking through what you know out loud.",
  },
] as const;

export default function RecallSelectPage() {
  const { user } = useAuth();

  return (
    <AppShell>
      <PageShell
        title="Choose a Recall Method"
        description="Pick how you want to study from your notes right now. You can switch methods any time."
      >
        <div className="space-y-6">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Select an active recall mode to start practicing. Each option guides you
            to remember information in a slightly different way.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recallOptions.map((option) => (
              <div
                key={option.key}
                role="button"
                tabIndex={0}
                // Placeholder behavior only – no real logic yet
                onClick={() => {
                  // TODO: Wire up navigation / behavior when recall flows are ready.
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    // TODO: Wire up keyboard activation when recall flows are ready.
                  }
                }}
                className="group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-200 rounded-2xl"
              >
                <Card className="flex h-full flex-col justify-between gap-3 rounded-2xl border border-zinc-200 bg-white/90 p-5 text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-50 dark:hover:border-zinc-700">
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {option.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {option.description}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-2 w-fit px-0 text-xs text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-50"
                  >
                    Coming soon →
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </PageShell>
    </AppShell>
  );
}

