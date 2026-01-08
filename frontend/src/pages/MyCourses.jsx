import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  LayoutDashboard, 
  Settings, 
  LogOut, 
  PlayCircle,
  Trash2,
  Loader2,
  ChevronRight
} from "lucide-react";

export default function MyCourses() {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    const fetchMyCourses = async () => {
      try {
        const userId = parsedUser.id || parsedUser._id;
        // Waxaan ka soo xulaynaa database-ka koorsooyinka ardaygan u gaarka ah
        const response = await axios.get(`http://localhost:5000/api/my-courses/${userId}`);
        setEnrolledCourses(response.data);
      } catch (error) {
        console.error("Error fetching my courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [navigate]);

  // Shaqada UNENROLL
  const handleUnenroll = async (courseId) => {
    if (!window.confirm("Ma hubtaa inaad rabto inaad iska saarto koorsadan?")) return;
    try {
      const userId = user.id || user._id;
      await axios.delete(`http://localhost:5000/api/unenroll/${courseId}/${userId}`);
      setEnrolledCourses(prev => prev.filter(item => item.course._id !== courseId));
    } catch (error) {
      console.error("Unenroll error:", error);
      alert("Cilad ayaa dhacday intii lagu guda jiray ka saarista.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
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
          <span className="text-xl font-black tracking-tighter uppercase text-slate-900 italic">Aqoon-Soor</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Button onClick={() => navigate("/dashboard")} variant="ghost" className="w-full justify-start gap-3 text-slate-500 font-semibold hover:bg-slate-50 rounded-xl italic">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Button>
          <Button variant="secondary" className="w-full justify-start gap-3 bg-blue-50 text-blue-600 font-bold rounded-xl border-none italic">
            <BookOpen className="h-5 w-5" /> My Courses
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 font-semibold hover:bg-slate-50 rounded-xl italic">
            <Settings className="h-5 w-5" /> Settings
          </Button>
        </nav>

        <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:bg-red-50 font-bold rounded-xl italic">
          <LogOut className="h-5 w-5" /> Logout
        </Button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 leading-tight italic uppercase tracking-tighter">My Enrolled Courses</h1>
          <p className="text-slate-500 font-medium italic">Sii wad waxbarashadaada meeshii ay kuu joogtay.</p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.map((item) => (
                <Card key={item._id} className="group border-none shadow-sm rounded-4xl bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-48">
                    <img src={item.course.image} alt={item.course.title} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 backdrop-blur-md text-blue-600 font-bold px-3 py-1 rounded-lg shadow-sm">
                        Enrolled
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-500 border-none text-[10px] uppercase font-bold italic">
                       {item.course.category || "General"}
                    </Badge>
                    
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 italic leading-tight group-hover:text-blue-600 transition-colors">
                        {item.course.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-medium uppercase italic">Level One</p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {/* SHAQADA CUSUB: CONTINUING BUTTON */}
                      <Button 
                        onClick={() => navigate(`/course/${item.course._id}/learn`)}
                        className="flex-1 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl h-12 flex items-center justify-center gap-2 italic transition-colors"
                      >
                        <PlayCircle className="h-4 w-4" /> Continue
                      </Button>
                      
                      <Button 
                        onClick={() => handleUnenroll(item.course._id)}
                        variant="outline" 
                        className="border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl px-4"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-slate-100/50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-medium italic text-lg">Weli wax koorso ah ma enroll-gareysan.</p>
                <Button onClick={() => navigate("/dashboard")} variant="link" className="text-blue-600 font-bold mt-2 italic text-lg">
                  Explore Courses <ChevronRight className="ml-1 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}