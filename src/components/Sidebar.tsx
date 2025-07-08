import { NavLink } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Activity, AlertCircle, BarChart3, Home, MessageSquareText, Target, Brain, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const menuItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/predictions", icon: Target, label: "Predictions vs Actual" },
    { to: "/model-insights", icon: Brain, label: "Model Insights" },
    { to: "/data-sources", icon: BookOpen, label: "Data Sources" },
    { to: "/about", icon: AlertCircle, label: "About" },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-covid-blue p-1">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div className="grid gap-0.5">
            <h3 className="font-semibold text-lg tracking-tight">COVID-19</h3>
            <p className="text-xs text-muted-foreground font-medium">Malaysia Tracker</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-4 rounded-md px-3 py-2",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-accent/50 transition-colors"
                    )
                  }
                  end={item.to === "/"}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-4">
        <p className="text-xs text-muted-foreground">
          COVID-19 Outbreak Prediction System for Malaysia
        </p>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
