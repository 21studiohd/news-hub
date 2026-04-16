import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Role } from "@/data/mock-data";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  isSuperadmin: boolean;
  isEditor: boolean;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function loadProfile(fbUser: FirebaseUser): Promise<AuthUser | null> {
  try {
    const snap = await getDoc(doc(db, "users", fbUser.uid));
    if (!snap.exists()) {
      return null;
    }
    const data = snap.data() as { name?: string; role?: Role; avatar?: string };
    if (data.role !== "superadmin" && data.role !== "editor") {
      return null;
    }
    return {
      id: fbUser.uid,
      email: fbUser.email || "",
      name: data.name || fbUser.email || "Përdorues",
      role: data.role,
      avatar: data.avatar,
    };
  } catch (err) {
    console.error("Failed to load user profile:", err);
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        const profile = await loadProfile(fbUser);
        if (!profile) {
          // User exists in Auth but has no valid role doc — sign them out.
          await signOut(auth);
          setUser(null);
        } else {
          setUser(profile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const profile = await loadProfile(cred.user);
      if (!profile) {
        await signOut(auth);
        return { ok: false, error: "Llogaria juaj nuk ka leje për të hyrë në panel." };
      }
      setUser(profile);
      return { ok: true };
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code || "";
      let message = "Hyrja dështoi. Provoni përsëri.";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        message = "Email ose fjalëkalim i pasaktë.";
      } else if (code === "auth/too-many-requests") {
        message = "Shumë përpjekje. Provoni më vonë.";
      } else if (code === "auth/invalid-email") {
        message = "Email i pavlefshëm.";
      }
      return { ok: false, error: message };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
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
