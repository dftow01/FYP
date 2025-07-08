import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center px-4 md:px-6">
        <SidebarTrigger>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </SidebarTrigger>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="hidden md:flex">
            <Badge variant="outline" className="bg-covid-light text-covid-blue font-medium">
              Last updated: {new Date().toLocaleDateString()}
            </Badge>
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
