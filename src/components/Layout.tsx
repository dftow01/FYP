
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar />
        <div className="flex flex-col flex-1 h-screen overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
