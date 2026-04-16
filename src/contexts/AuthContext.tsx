import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, mockUsers } from "@/data/mock-data";

// Mock credentials — replace with Firebase Auth (signInWithEmailAndPassword) later.
// Each demo user has a known password so the login flow now requires both fields.
const MOCK_PASSWORDS: Record<string, string> = {
  "arben@tetova1.com": "superadmin123",
  "elona@tetova1.com": "editor123",
  "driton@tetova1.com": "editor123",
};

const SESSION_KEY = "tetova1_auth_user";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  isSuperadmin: boolean;
  isEditor: boolean;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage (Firebase Auth will replace this with onAuthStateChanged)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as User;
        if (mockUsers.find((u) => u.id === parsed.id)) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = mockUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (!found) {
      return { ok: false, error: "Email-i nuk u gjet." };
    }
    if (MOCK_PASSWORDS[found.email] !== password) {
      return { ok: false, error: "Fjalëkalimi është i pasaktë." };
    }
    if (found.role !== "superadmin" && found.role !== "editor") {
      return { ok: false, error: "Nuk keni leje për të hyrë." };
    }
    setUser(found);
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isSuperadmin: user?.role === "superadmin",
        isEditor: user?.role === "editor",
        isAuthenticated: !!user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
