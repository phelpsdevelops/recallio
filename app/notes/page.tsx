"use client";

import { AppShell, PageShell, Card, Button } from "../../components/ui";
import { useAuth } from "../../components/authContext";
import Link from "next/link";

export default function NotesPage() {
  const { user } = useAuth();
  
  // TODO: Load notes from storage
  const notes: any[] = [];

  return (
    <AppShell>
      <PageShell
        title="Stored Notes"
        description="All your saved notes and uploaded files."
        actions={
          <div className="flex gap-2">
            <Link href="/notes/new">
              <Button>New Note</Button>
            </Link>
            {notes.length > 0 && (
              <Link href="/recall/select">
                <Button variant="outline">Recall</Button>
              </Link>
            )}
          </div>
        }
      >
        {notes.length === 0 ? (
          <Card className="py-12 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No notes yet. Start by creating a new note.
            </p>
            <Link href="/notes/new">
              <Button className="mt-4">Begin New Notes</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Notes will be listed here */}
          </div>
        )}
      </PageShell>
    </AppShell>
  );
}
