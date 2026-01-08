import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, ArrowLeft, ImagePlus, UserCircle } from "lucide-react";

export default function AdminAddCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '', 
    price: '',
    category: '',
    image: ''    
  });

  // This function allows the inputs to be editable
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Ensure price is a number for MongoDB validation
      const dataToSend = { 
        ...formData, 
        price: Number(formData.price),
        lessons: [] 
      };

      await axios.post('http://localhost:5000/api/courses', dataToSend);
      alert("Course added successfully! 🎉");
      navigate("/admin/courses");
    } catch (err) {
        // Log full error for debugging (server response or network error)
        console.error("Submission Error:", err.response?.data ?? err.message ?? err);
        const serverMessage = err.response?.data?.message;
        const fallback = err.message || "Failed to save course.";
        alert("Error: " + (serverMessage || fallback));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left p-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin/courses")}
          className="hover:bg-slate-100 font-bold gap-2 text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" /> BACK TO LIST
        </Button>
        <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">
          ADD NEW <span className="text-blue-600">COURSE</span>
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="border-none shadow-2xl rounded-[2.5rem] bg-white overflow-hidden p-6 md:p-10">
          <CardContent className="space-y-8 pt-6">
            
            <div className="space-y-3">
              <Label className="font-black uppercase text-slate-400 text-xs tracking-widest ml-1">Course Title</Label>
              <Input 
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Advanced Arabic" 
                className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-medium px-6 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-3">
              <Label className="font-black uppercase text-slate-400 text-xs tracking-widest ml-1">Description</Label>
              <Textarea 
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the course content..." 
                className="rounded-2xl border-slate-100 bg-slate-50/50 font-medium p-6 min-h-[150px] focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="font-black uppercase text-slate-400 text-xs tracking-widest ml-1">Instructor Name</Label>
                <div className="relative">
                  <UserCircle className="absolute left-4 top-4 h-5 w-5 text-slate-300" />
                  <Input 
                    name="instructor"
                    required
                    value={formData.instructor}
                    onChange={handleChange}
                    placeholder="e.g. Liban Ali Hassan" 
                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-black uppercase text-slate-400 text-xs tracking-widest ml-1">Price ($)</Label>
                <Input 
                  name="price"
                  required
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 100" 
                  className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-medium px-6 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-black uppercase text-slate-400 text-xs tracking-widest ml-1">Category</Label>
                <Input 
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Languages" 
                  className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-medium px-6 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-black uppercase text-slate-400 text-xs tracking-widest ml-1">Thumbnail URL (Optional)</Label>
                <div className="relative">
                  <ImagePlus className="absolute left-4 top-4 h-5 w-5 text-slate-300" />
                  <Input 
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg" 
                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 font-medium focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 text-right">
              <Button 
                disabled={loading}
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 h-14 px-12 rounded-2xl font-black uppercase shadow-xl text-white flex items-center gap-3 ml-auto transition-all active:scale-95"
              >
                <Save className="h-5 w-5" /> {loading ? "SAVING..." : "SAVE COURSE"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}