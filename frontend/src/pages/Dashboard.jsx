import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  PlusCircle,
  Bell,
  Loader2,
  ChevronRight
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login");
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  // Shaqada Enrollment-ka ee ku xiran Database-ka
  const handleEnroll = async (courseId) => {
    try {
      const studentId = user?.id || user?._id; 
      
      if (!studentId) {
        alert("Fadlan marka hore soo gal (Login)");
        return navigate("/login");
      }

      // U dir xogta Database-ka (Enrollment API)
      const response = await axios.post("http://localhost:5000/api/enroll", { 
        userId: studentId, 
        courseId: courseId 
      });

      alert(response.data.message); // "Waad is diiwaangelisay! 🎉"
      navigate("/my-courses"); // Toos ugu kaxay bogga koorsooyinka ardayga

    } catch (error) {
      console.error("Enrollment error:", error);
      alert(error.response?.data?.message || "Cilad ayaa dhacday intii lagu guda jiray Enrollment-ka");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden md:flex flex-col p-6 space-y-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-600 p-2 rounded-xl shadow-md">
            <BookOpen className="text-white h-5 w-5" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase text-slate-900">Aqoon-Soor</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-3 bg-blue-50 text-blue-600 font-bold rounded-xl border-none">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Button>
          <Button onClick={() => navigate("/my-courses")} variant="ghost" className="w-full justify-start gap-3 text-slate-500 font-semibold hover:bg-slate-50 rounded-xl">
            <BookOpen className="h-5 w-5" /> My Courses
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 font-semibold hover:bg-slate-50 rounded-xl">
            <Settings className="h-5 w-5" /> Settings
          </Button>
        </nav>

        <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 font-bold rounded-xl" onClick={handleLogout}>
          <LogOut className="h-5 w-5" /> Logout
        </Button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        
        {/* Header Section */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight italic">
              Welcome back, {user ? user.name.split(' ')[0] : 'ayub'}! 👋
            </h1>
            <p className="text-slate-500 font-medium italic">Here is your learning progress for today.</p>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
             </Button>
             <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-sm uppercase">
                {user ? user.name.charAt(0) : 'A'}
             </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total Courses", value: courses.length || "0", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Hours Learned", value: "12h", icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
            { label: "Points Earned", value: "850", icon: Trophy, color: "text-green-600", bg: "bg-green-100" }
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-sm rounded-3xl bg-white">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`${stat.bg} p-3 rounded-2xl`}>
                  <stat.icon className={`${stat.color} h-6 w-6`} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">{stat.label}</p>
                  <h3 className="text-2xl font-black text-slate-900 italic">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Available Courses Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">Available Courses</h2>
            <Button variant="link" className="text-blue-600 font-bold p-0 flex items-center gap-1 italic">
              Browse All <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course._id} className="group border-none shadow-sm rounded-4xl bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 backdrop-blur-md text-blue-600 font-bold px-3 py-1 rounded-lg shadow-sm">
                        ${course.price || "Free"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-500 border-none text-[10px] uppercase font-bold italic">
                       {course.category || "General"}
                    </Badge>
                    
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 italic leading-tight group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-medium uppercase italic">Level One</p>
                    </div>

                    <Button 
                      onClick={() => handleEnroll(course._id)}
                      className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl h-12 flex items-center justify-center gap-2 italic transition-colors"
                    >
                      Enroll Now <PlusCircle className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}