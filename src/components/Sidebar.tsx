
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Home,
  ListTodo,
  Activity,
  Award,
  Calendar,
  FileText,
  Settings,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Tasks", path: "/tasks", icon: ListTodo },
    { name: "Activities", path: "/activities", icon: Activity },
    { name: "Leaderboard", path: "/leaderboard", icon: Award },
    { name: "Events", path: "/events", icon: Calendar },
    { name: "Resources", path: "/resources", icon: FileText }
  ];
  
  // Admin-only items
  const adminItems = [
    { name: "Settings", path: "/settings", icon: Settings },
  ];
  
  return (
    <aside className="flex h-screen w-64 flex-col bg-sidebar">
      <div className="flex items-center gap-2 px-6 py-5">
        <img 
          src="/lovable-uploads/fd0ebe0a-3c85-4aca-8d20-0cb96d54fd21.png" 
          alt="We For Change" 
          className="h-10"
        />
      </div>
      
      <div className="flex flex-col gap-1.5 px-3 py-2">
        <div className="my-2 rounded-lg bg-white/10 p-3">
          <div className="flex items-center gap-3">
            {user?.avatar ? (
              <img 
                src={user.avatar}
                alt={user.name} 
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="grid h-10 w-10 place-content-center rounded-full bg-white/20 text-white">
                {user?.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white/70">{user?.role}</p>
            </div>
          </div>
        </div>
        
        <nav className="space-y-1 py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActivePath(item.path) ? "active" : ""}`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          
          {isAdmin && adminItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${isActivePath(item.path) ? "active" : ""}`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="mt-auto px-3 py-4">
        <button 
          onClick={logout}
          className="sidebar-link w-full justify-start"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
