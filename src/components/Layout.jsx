import { Outlet } from "react-router-dom";
import SidebarNavigation from "./Navigation";

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content Area - Using Outlet for nested routes */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
export default AppLayout;
