"use client";

import { AppShell, PageShell, Card, Button } from "../../components/ui";
import { useAuth } from "../../components/authContext";
import Link from "next/link";

export default function DocumentationPage() {
  const { user } = useAuth();
  
  // TODO: Load documentation from storage
  const docs: any[] = [];

  return (
    <AppShell>
      <PageShell
        title="Documentation"
        description="Your personal knowledge base for step-by-step instructions."
        actions={
          <Link href="/documentation/new">
            <Button>New Documentation</Button>
          </Link>
        }
      >
        {docs.length === 0 ? (
          <Card className="py-12 text-center">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              No documentation yet. Create your first entry.
            </p>
            <Link href="/documentation/new">
              <Button className="mt-4">Create Documentation</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Documentation entries will be listed here */}
          </div>
        )}
      </PageShell>
    </AppShell>
  );
}
