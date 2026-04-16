import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Role } from "@/data/mock-data";

interface ProtectedRouteProps {
  children: ReactNode;
  /** If provided, only these roles may access. Otherwise any authenticated user passes. */
  roles?: Role[];
}

export function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-muted-foreground">Po ngarkohet...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="font-serif text-2xl font-bold mb-2">Akses i kufizuar</h1>
        <p className="text-sm text-muted-foreground">Nuk keni leje për këtë faqe.</p>
      </div>
    );
  }

  return <>{children}</>;
}
