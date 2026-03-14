 "use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import type { User } from "../types/models";

interface AuthContextValue {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_KEY = "recallio_mock_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }
    const stored = window.localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored) as User);
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return; // Don't redirect while loading
    const authRoutes = ["/login", "/signup"];
    if (!user && !authRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [user, pathname, router, loading]);

  const login = (email: string) => {
    const mockUser: User = {
      id: "mock-user",
      name: email.split("@")[0] || "Recallio User",
      email,
    };
    setUser(mockUser);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    }
    router.replace("/dashboard");
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_KEY);
    }
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

