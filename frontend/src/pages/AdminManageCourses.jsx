import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit, Search, Layers, UserCircle, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function AdminManageCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:5000/api/courses/${id}`);
        setCourses(courses.filter(c => c._id !== id));
      } catch  {
        alert("Failed to delete course.");
      }
    }
  };

  const filtered = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
            COURSE <span className="text-blue-600">MANAGEMENT</span>
          </h1>
          <p className="text-slate-500 font-medium italic">Manage all available learning tracks.</p>
        </div>
        <Button 
          onClick={() => navigate("/admin/courses/new")} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-6 rounded-xl shadow-lg gap-2"
        >
          <Plus className="h-5 w-5" /> CREATE NEW COURSE
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
        <Input 
          placeholder="Search courses..." 
          className="pl-10 h-12 bg-white border-none shadow-sm rounded-xl italic focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card className="border-none shadow-sm rounded-[2.5rem] bg-white overflow-hidden border-t-4 border-t-blue-600">
        <CardHeader className="p-8 border-b border-slate-50">
          <CardTitle className="text-xl font-black uppercase italic flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" /> ACTIVE COURSES ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-5">Details</th>
                  <th className="px-8 py-5">Instructor</th>
                  <th className="px-8 py-5 text-center">Lessons</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map((course) => (
                  <tr key={course._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-xl bg-slate-100 overflow-hidden flex items-center justify-center">
                          {course.image ? <img src={course.image} className="h-full w-full object-cover" /> : <BookOpen className="text-slate-300 h-6 w-6" />}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 italic text-lg">{course.title}</p>
                          <Badge className="bg-blue-50 text-blue-600 border-none uppercase text-[9px]">{course.category}</Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-slate-600 italic">
                      <div className="flex items-center gap-2">
                        <UserCircle className="h-4 w-4 text-slate-400" />
                        {course.instructor}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-black text-slate-700">
                      {course.lessons?.length || 0}
                    </td>
                    <td className="px-8 py-6 text-blue-600 font-black text-xl">${course.price}</td>
                      <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <Button
                          onClick={() => navigate(`/admin/courses/${course._id}/add-lesson`)}
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 font-bold hover:bg-blue-50"
                        >
                          + Add Lesson
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-blue-600">
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button onClick={() => handleDelete(course._id)} variant="ghost" size="icon" className="rounded-full text-slate-400 hover:text-red-500">
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}