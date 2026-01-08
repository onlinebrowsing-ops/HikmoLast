import React from 'react';
import { useNavigate } from "react-router-dom";
import { BookOpen, BarChart3, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR: Kani mar walba wuu joogaa */}
      <aside className="w-72 bg-slate-900 text-slate-300 hidden lg:flex flex-col p-8 space-y-10 sticky top-0 h-screen">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Settings className="text-white h-6 w-6" />
          </div>
          <span className="text-2xl font-black text-white italic">ADMIN PANEL</span>
        </div>
        <nav className="flex-1 space-y-3">
          <Button onClick={() => navigate("/admin")} variant="ghost" className="w-full justify-start gap-4 font-bold h-12 rounded-2xl hover:bg-slate-800 hover:text-white">
            <BarChart3 className="h-5 w-5" /> Overview
          </Button>
          <Button onClick={() => navigate("/admin/courses")} variant="ghost" className="w-full justify-start gap-4 font-bold h-12 rounded-2xl hover:bg-slate-800 hover:text-white">
            <BookOpen className="h-5 w-5" /> Manage Courses
          </Button>
        </nav>
        <Button onClick={() => navigate("/")} variant="ghost" className="w-full justify-start gap-4 text-red-400 font-bold h-12">
          <LogOut className="h-5 w-5" /> Sign Out
        </Button>
      </aside>

      {/* CONTENT: Halkan waxaa ka soo bixi doona Dashboard ama Manage Courses */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}