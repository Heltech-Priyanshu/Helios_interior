import React from "react";
import Sidebar from "../../../componets/layout/Admin/Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-[280px]">
        {/* Top Navbar */}
        <div className="w-full h-[70px] bg-white shadow-sm border-b flex items-center justify-between px-5 md:px-8 sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-bold text-[#111827]">
              Admin Dashboard
            </h1>

            <p className="text-sm text-gray-500">
              Welcome back 👋
            </p>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <h3 className="text-sm font-semibold text-[#111827]">
                Admin
              </h3>

              <p className="text-xs text-gray-500">
                administrator
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-[#03cafc] flex items-center justify-center text-white font-bold">
          
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8">
     
          <div className="bg-white rounded-2xl shadow-sm p-5 md:p-8 min-h-[calc(100vh-135px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;