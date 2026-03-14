"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("recallio_mock_user");
    }
    router.replace("/login");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 text-sm text-zinc-600 dark:bg-black dark:text-zinc-300">
      Signing you out...
    </main>
  );
}

