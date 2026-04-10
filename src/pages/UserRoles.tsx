import { mockUsers } from "@/data/mock-data";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, PenSquare } from "lucide-react";

const UserRoles = () => {
  const { isSuperadmin } = useAuth();

  if (!isSuperadmin) return <Navigate to="/admin" replace />;

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold mb-6">Rolet e Përdoruesve</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Badge variant={user.role === "superadmin" ? "default" : "secondary"} className="mt-1 text-[10px]">
                    {user.role === "superadmin" ? (
                      <><Shield className="h-3 w-3 mr-1" /> Superadmin</>
                    ) : (
                      <><PenSquare className="h-3 w-3 mr-1" /> Redaktor</>
                    )}
                  </Badge>
                </div>
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
