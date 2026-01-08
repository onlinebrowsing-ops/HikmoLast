import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Video, Save } from "lucide-react";

export default function AddLesson() {
  const { id } = useParams(); // Waxuu ka soo qabanayaa ID-ga koorsada URL-ka
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState({
    title: '',
    videoUrl: '',
    duration: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Client-side validation
      if (!lesson.title || !lesson.videoUrl) {
        alert('Please provide a lesson title and video URL.');
        setLoading(false);
        return;
      }

      // Send lesson to server
      await axios.post(`http://localhost:5000/api/courses/${id}/lessons`, lesson);
      alert("Lesson added successfully! 🎥");
      // Redirect to lessons list for this course
      navigate(`/admin/courses/${id}/lessons`);
    } catch (err) {
      console.error("Error adding lesson:", err);
      alert("Failed to add lesson.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-left">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 font-bold">
        <ArrowLeft className="mr-2 h-4 w-4" /> BACK
      </Button>

      <h1 className="text-3xl font-black text-slate-900 uppercase italic mb-8">
        ADD NEW <span className="text-blue-600">LESSON</span>
      </h1>

      <form onSubmit={handleSubmit}>
        <Card className="border-none shadow-xl rounded-3xl p-6">
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="font-bold uppercase text-xs text-slate-400">Lesson Title</Label>
              <Input 
                required 
                placeholder="e.g. Introduction to Grammar"
                className="h-12 rounded-xl bg-slate-50 border-none"
                onChange={(e) => setLesson({...lesson, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold uppercase text-xs text-slate-400">Video URL (YouTube/Vimeo)</Label>
              <div className="relative">
                <Video className="absolute left-3 top-3.5 h-5 w-5 text-slate-300" />
                <Input 
                  required 
                  placeholder="https://youtube.com/..."
                  className="pl-10 h-12 rounded-xl bg-slate-50 border-none"
                  onChange={(e) => setLesson({...lesson, videoUrl: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold uppercase text-xs text-slate-400">Duration (e.g. 10:30)</Label>
              <Input 
                placeholder="15 mins"
                className="h-12 rounded-xl bg-slate-50 border-none"
                onChange={(e) => setLesson({...lesson, duration: e.target.value})}
              />
            </div>

            <Button disabled={loading} className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-white">
              <Save className="mr-2 h-5 w-5" /> {loading ? "UPLOADING..." : "SAVE LESSON"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}