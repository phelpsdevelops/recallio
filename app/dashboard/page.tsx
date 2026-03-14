import Link from "next/link";
import { AppShell, Card, PageShell, Button } from "../../components/ui";

const actions = [
  {
    href: "/notes/new",
    title: "Begin New Notes",
    description: "Capture fresh notes or upload files to turn into recall tools.",
  },
  {
    href: "/notes",
    title: "Stored Notes",
    description: "Browse and reuse all of your saved notes and uploads.",
  },
  {
    href: "/documentation",
    title: "Documentation",
    description: "Keep step-by-step instructions for work and recurring tasks.",
  },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <PageShell
        title="Your Recall workspace"
        description="Start a new note session, jump back into existing notes, or open your documentation hub."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {actions.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="flex h-full cursor-pointer flex-col justify-between gap-3 transition hover:-translate-y-0.5 hover:shadow-md">
                <div>
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
                <Button variant="ghost" className="w-fit px-0 text-xs">
                  Open →
                </Button>
              </Card>
            </Link>
          ))}
        </div>
      </PageShell>
    </AppShell>
  );
}

