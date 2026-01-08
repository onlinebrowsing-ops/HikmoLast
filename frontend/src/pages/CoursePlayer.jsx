import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  PlayCircle, 
  CheckCircle2, 
  ChevronLeft, 
  Clock, 
  Layout, 
  Lock,
  Menu
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${id}`);
        setCourse(res.data);
        // Dooro casharka u horeeya haddii ay casharo jiraan
        if (res.data.lessons && res.data.lessons.length > 0) {
          setActiveLesson(res.data.lessons[0]);
        }
      } catch (err) {
        console.error("Error fetching course player:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="flex h-screen items-center justify-center font-bold italic text-blue-600">LOADING PLAYER...</div>;
  if (!course) return <div className="p-10 text-center">Course not found.</div>;

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Header */}
      <div className="h-16 border-b flex items-center justify-between px-6 bg-white shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-black uppercase italic tracking-tighter text-slate-900">
            {course.title} <span className="text-blue-600 ml-2">Learning</span>
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-3">
            <Badge variant="outline" className="font-bold border-blue-100 text-blue-600 italic">
                {course.category}
            </Badge>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Video Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Video Player Container */}
            <div className="aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl relative group">
              {activeLesson ? (
                <iframe
                  className="w-full h-full"
                  src={activeLesson.videoUrl.replace("watch?v=", "embed/")}
                  title={activeLesson.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white space-y-4">
                    <Lock className="h-12 w-12 text-slate-500" />
                    <p className="font-bold uppercase italic text-slate-400">No content available yet</p>
                </div>
              )}
            </div>

            {/* Lesson Info */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 italic uppercase">
                    {activeLesson?.title || "Welcome to the course"}
                  </h2>
                  <p className="text-slate-500 font-medium mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Duration: {activeLesson?.duration || "N/A"}
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 font-bold rounded-xl px-6">
                    MARK AS COMPLETE
                </Button>
              </div>
              <div className="h-px bg-slate-100 my-6" />
              <p className="text-slate-600 leading-relaxed font-medium">
                {course.description}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar - Lessons List */}
        <div className="w-80 lg:w-96 border-l bg-white flex flex-col shrink-0">
          <div className="p-6 border-b">
            <h3 className="font-black uppercase italic tracking-tight text-slate-900 mb-4 flex items-center gap-2">
              <Menu className="h-5 w-5 text-blue-600" /> Course Content
            </h3>
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase text-slate-400">
                    <span>Your Progress</span>
                    <span>0%</span>
                </div>
                <Progress value={0} className="h-2 rounded-full bg-slate-100" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {course.lessons && course.lessons.length > 0 ? (
              course.lessons.map((lesson, index) => (
                <button
                  key={index}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left group ${
                    activeLesson?._id === lesson._id 
                      ? 'bg-blue-50 border-blue-100 border' 
                      : 'hover:bg-slate-50 border-transparent border'
                  }`}
                >
                  <div className={`mt-1 shrink-0 ${activeLesson?._id === lesson._id ? 'text-blue-600' : 'text-slate-300'}`}>
                    {activeLesson?._id === lesson._id ? <PlayCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                  </div>
                  <div>
                    <h4 className={`font-bold italic text-sm mb-1 ${activeLesson?._id === lesson._id ? 'text-blue-700' : 'text-slate-700'}`}>
                      {index + 1}. {lesson.title}
                    </h4>
                    <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {lesson.duration}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-10 opacity-50 italic text-sm">No lessons found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}