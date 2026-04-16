import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, PenSquare } from "lucide-react";
import { Role } from "@/data/mock-data";

interface FirestoreUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

const UserRoles = () => {
  const { isSuperadmin } = useAuth();
  const [users, setUsers] = useState<FirestoreUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSuperadmin) return;
    (async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const list: FirestoreUser[] = snap.docs.map((d) => {
          const data = d.data() as { email?: string; name?: string; role?: Role };
          return {
            id: d.id,
            email: data.email || "",
            name: data.name || data.email || "Pa emër",
            role: (data.role as Role) || "editor",
          };
        });
        setUsers(list);
      } catch (err) {
        console.error(err);
        setError("Nuk u arrit të ngarkohen përdoruesit nga Firestore.");
      } finally {
        setLoading(false);
      }
    })();
  }, [isSuperadmin]);

  if (!isSuperadmin) return <Navigate to="/admin" replace />;

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold mb-6">Rolet e Përdoruesve</h1>

      {loading && <p className="text-sm text-muted-foreground">Po ngarkohen përdoruesit...</p>}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nuk ka përdorues në koleksionin <code>users</code>. Shto dokumente në Firestore me id = UID e Auth.
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div>
                <h3 className="font-medium truncate">{user.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                <Badge variant={user.role === "superadmin" ? "default" : "secondary"} className="mt-2 text-[10px]">
                  {user.role === "superadmin" ? (
                    <><Shield className="h-3 w-3 mr-1" /> Superadmin</>
                  ) : (
                    <><PenSquare className="h-3 w-3 mr-1" /> Redaktor</>
                  )}
                </Badge>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                {user.role === "superadmin"
                  ? "Qasje e plotë: menaxhon të gjitha postimet, përdoruesit dhe cilësimet."
                  : "Mund të krijojë dhe redaktojë vetëm postimet e veta."}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserRoles;
