import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { BottomNavigation } from "../components/layout/BottomNavigation";
import { Toast } from "../components/common/Toast";
import { useUserProgress } from "../context/UserProgressContext";

export const StudentLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { activeNotification, clearNotification } = useUserProgress();

  return (
    <div className="study-app min-h-screen flex bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Desktop Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Sticky Bottom Nav */}
      <BottomNavigation />

      {/* Global Toast for Badges / XP Updates */}
      {activeNotification && (
        <Toast
          title={activeNotification.title}
          message={activeNotification.message}
          type={activeNotification.type || "info"}
          onClose={clearNotification}
        />
      )}
    </div>
  );
};
