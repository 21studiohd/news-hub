import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { FileText, BarChart3, Users, PenSquare, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const adminNav = [
  { title: "Manage Posts", url: "/admin", icon: FileText },
  { title: "Create Post", url: "/admin/create", icon: PenSquare },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "User Roles", url: "/admin/users", icon: Users },
];

function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, logout, isSuperadmin } = useAuth();

  const filteredNav = isSuperadmin
    ? adminNav
    : adminNav.filter((n) => n.url !== "/admin/users");

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {!collapsed && (
              <span className="font-serif font-bold text-sm">Newsroom</span>
            )}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className="hover:bg-sidebar-accent/50">
                    <Home className="mr-2 h-4 w-4" />
                    {!collapsed && <span>View Site</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} className="hover:bg-sidebar-accent/50">
                  <LogOut className="mr-2 h-4 w-4" />
                  {!collapsed && <span>Sign Out</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {!collapsed && user && (
              <div className="flex items-center gap-2 p-3 mt-2 border-t">
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="text-xs">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-muted-foreground capitalize">{user.role}</div>
                </div>
              </div>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const AdminLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-12 flex items-center border-b px-4">
            <SidebarTrigger className="mr-4" />
            <span className="font-serif font-bold text-sm">The Daily Wire — Admin</span>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
