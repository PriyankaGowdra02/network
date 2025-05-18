
import { useState } from "react";
import { Link } from "react-router-dom";
import { NetworkLogo } from "./NetworkLogo";
import { 
  CircleUser, 
  Home, 
  MessageSquare, 
  Network, 
  Users, 
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export function NetworkSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navigationItems = [
    { name: "Feed", icon: Home, path: "/" },
    { name: "Profile", icon: CircleUser, path: "/profile" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Network", icon: Network, path: "/network" },
    { name: "Clusters", icon: Users, path: "/clusters" },
    { name: "Notifications", icon: Bell, path: "/notifications" },
  ];

  const bottomItems = [
    { name: "Discover", icon: Sparkles, path: "/discover" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-neural-grid-line",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && <NetworkLogo size="sm" />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-neural-muted/20 ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex flex-col flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md",
                "text-neural-accent hover:bg-neural-accent/10",
                "group transition-all duration-200"
              )}
            >
              <item.icon
                size={20}
                className="text-neural-accent group-hover:text-neural-pulse pulse-effect"
              />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-auto">
          <div className="px-2 space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center py-2 px-3 rounded-md",
                  "text-neural-accent hover:bg-neural-accent/10",
                  "group transition-all duration-200"
                )}
              >
                <item.icon
                  size={20}
                  className="text-neural-accent group-hover:text-neural-pulse"
                />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
