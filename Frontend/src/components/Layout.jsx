import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed md:static z-50 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 bg-white h-full w-64`}
        >
          <Navbar />
        </div>

        {/* Overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
