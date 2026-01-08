import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/courses').then(res => setCourses(res.data));
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-black text-slate-900 uppercase italic">Admin <span className="text-blue-600">Overview</span></h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard label="Revenue" value="$4,250" icon={<DollarSign/>} color="bg-green-500" />
        <StatCard label="Students" value="520" icon={<Users/>} color="bg-blue-500" />
        <StatCard label="Courses" value={courses.length} icon={<BookOpen/>} color="bg-orange-500" />
      </div>

      {/* Recent Table... (Halkan koodhka jadwalka geli) */}
    </div>
  );
}

// Helper component si koodhku u yaraado
const StatCard = ({ label, value, icon, color }) => (
  <Card className="border-none shadow-sm rounded-3xl bg-white p-8 flex items-center justify-between">
    <div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h3 className="text-4xl font-black text-slate-900 italic">{value}</h3>
    </div>
    <div className={`${color} p-4 rounded-2xl text-white shadow-lg`}>{icon}</div>
  </Card>
);