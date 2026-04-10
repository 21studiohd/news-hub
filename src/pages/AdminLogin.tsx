import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { mockUsers } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email)) {
      navigate("/admin");
    } else {
      setError("Kredencialet e pavlefshme. Provo njërin nga llogaritë demo.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="font-serif text-2xl">Hyrje në Panel</CardTitle>
          <CardDescription>Hyni në panelin e redaksisë</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="Shkruaj email-in tënd..."
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">Hyr</Button>
          </form>
          <div className="mt-6 border-t pt-4">
            <p className="text-xs text-muted-foreground mb-2">Llogaritë demo:</p>
            {mockUsers.map((u) => (
              <button
                key={u.id}
                onClick={() => { setEmail(u.email); }}
                className="flex items-center gap-2 w-full p-2 text-left text-sm hover:bg-secondary rounded transition-colors"
              >
                <img src={u.avatar} alt={u.name} className="w-6 h-6 rounded-full object-cover" />
                <div>
                  <span className="font-medium">{u.name}</span>
                  <span className="text-xs text-muted-foreground ml-2 capitalize">({u.role})</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
