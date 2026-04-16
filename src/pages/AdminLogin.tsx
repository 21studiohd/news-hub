import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockUsers } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Lock } from "lucide-react";

const DEMO_PASSWORDS: Record<string, string> = {
  "arben@tetova1.com": "superadmin123",
  "elona@tetova1.com": "editor123",
  "driton@tetova1.com": "editor123",
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname || "/admin";

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Plotësoni email-in dhe fjalëkalimin.");
      return;
    }
    setSubmitting(true);
    const result = login(email, password);
    setSubmitting(false);
    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || "Hyrja dështoi.");
    }
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword(DEMO_PASSWORDS[demoEmail] || "");
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="font-serif text-2xl">Hyrje në Panel</CardTitle>
          <CardDescription>Vetëm për administratorë dhe redaktorë</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="ju@tetova1.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Fjalëkalimi</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Po hyhet..." : "Hyr"}
            </Button>
          </form>
          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-muted-foreground mb-2">Llogaritë demo (klikoni për t'i plotësuar):</p>
            {mockUsers.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => fillDemo(u.email)}
                className="flex items-center gap-2 w-full p-2 text-left text-sm hover:bg-secondary rounded transition-colors"
              >
                <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                <div className="flex-1">
                  <span className="font-medium">{u.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 capitalize">({u.role})</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">{DEMO_PASSWORDS[u.email]}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
