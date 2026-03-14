import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" },
) {
  const { className = "", variant = "primary", ...rest } = props;
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const styles: Record<string, string> = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
    outline:
      "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800",
    ghost:
      "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800",
  };
  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      {...rest}
    />
  );
}

export function TextInput(
  props: InputHTMLAttributes<HTMLInputElement> & { label?: string },
) {
  const { label, className = "", ...rest } = props;
  return (
    <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-200">
      {label && <span>{label}</span>}
      <input
        className={`h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none ring-0 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 ${className}`}
        {...rest}
      />
    </label>
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  const { label, className = "", ...rest } = props;
  return (
    <label className="flex flex-col gap-1 text-sm text-zinc-700 dark:text-zinc-200">
      {label && <span>{label}</span>}
      <textarea
        className={`min-h-[160px] rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 ${className}`}
        {...rest}
      />
    </label>
  );
}

export function Card(props: { children: ReactNode; className?: string }) {
  const { children, className = "" } = props;
  return (
    <div className={`rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 ${className}`}>
      {children}
    </div>
  );
}

export function PageShell(props: { title?: string; description?: string; actions?: ReactNode; children: ReactNode }) {
  const { title, description, actions, children } = props;
  return (
    <div className="flex flex-1 flex-col gap-6">
      {(title || description || actions) && (
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            {title && (
              <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="mt-2 flex gap-2 md:mt-0">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

export function AppShell(props: { children: ReactNode }) {
  const { children } = props;
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-black dark:text-zinc-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 md:px-6 lg:px-8">
        <header className="mb-4 flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
              R
            </span>
            <span>Recallio</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/notes" className="hover:text-zinc-900 dark:hover:text-zinc-50">
              Notes
            </Link>
            <Link href="/documentation" className="hover:text-zinc-900 dark:hover:text-zinc-50">
              Documentation
            </Link>
            <Link href="/recall/select" className="hover:text-zinc-900 dark:hover:text-zinc-50">
              Recall
            </Link>
            <Link
              href="/logout"
              className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Sign out
            </Link>
          </nav>
        </header>
        {children}
      </div>
    </div>
  );
}

