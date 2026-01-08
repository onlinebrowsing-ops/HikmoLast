import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  ArrowRight, 
  PlayCircle, 
  Users, 
  Star, 
  BookOpen, 
  Facebook, 
  Twitter, 
  Instagram 
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const courses = [
    { title: "Data Analytics Zero to Pro", price: "$12", instructor: "Abdibari Gure", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400", category: "Data Science" },
    { title: "Full-Stack Web Mastery", price: "$15", instructor: "Mohamed Ali", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400", category: "Development" },
    { title: "Modern Graphic Design", price: "$10", instructor: "Farhiiya Ahmed", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=400", category: "Design" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      
      {/* --- NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <GraduationCap className="text-white h-6 w-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Aqoon-Soor</span>
        </div>
        
        <div className="hidden lg:flex gap-10 text-sm font-semibold text-slate-600">
          <a href="#" className="text-blue-600">Home</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Courses</a>
          <a href="#" className="hover:text-blue-600 transition-colors">About Us</a>
        </div>

        <div className="flex items-center gap-3">
          {/* Sign In Button - Halkan ayuu ku xiran yahay Router-ka */}
          <Button 
            variant="ghost" 
            className="font-bold text-slate-700"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
          
          {/* Join for Free - Tani waxay u diraysaa SignUp */}
          <Button 
            className="bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100 px-6 rounded-full font-bold"
            onClick={() => navigate("/signup")}
          >
            Join for Free
          </Button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="px-8 pt-16 pb-24 lg:flex items-center gap-16 max-w-7xl mx-auto">
        <div className="lg:w-1/2 space-y-8">
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-none px-4 py-1.5 font-bold">
            🚀 THE FUTURE OF LEARNING STARTS HERE
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight">
            Build Your Future with <span className="text-blue-600">Quality Education</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-lg">
            Ma rabtaa inaad barato xirfado cusub? Aqoon-Soor waa goobta saxda ah ee aad ku dhisan karto mustaqbalkaaga.
          </p>
          <div className="flex gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-orange-100"
              onClick={() => navigate("/signup")}
            >
              Start Learning <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-slate-200 font-bold">
              <PlayCircle className="mr-2 h-5 w-5 text-blue-600" /> Watch Demo
            </Button>
          </div>
        </div>

        <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-[500px] object-cover" 
              alt="Students"
            />
          </div>
          {/* Stats Badge */}
          <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4">
             <div className="bg-green-100 p-3 rounded-2xl"><Users className="text-green-600 w-6 h-6"/></div>
             <div>
               <p className="text-lg font-black text-slate-900">500+</p>
               <p className="text-sm font-medium text-slate-500">Active Students</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- STATS --- */}
      <div className="max-w-7xl mx-auto px-8 mb-24">
        <div className="bg-blue-900 rounded-[3rem] p-12 grid grid-cols-2 md:grid-cols-4 gap-12 text-center shadow-2xl">
          {[
            { label: "Active Students", value: "500+" },
            { label: "Premium Courses", value: "15+" },
            { label: "Expert Mentors", value: "8+" },
            { label: "Success Rate", value: "100%" },
          ].map((stat, i) => (
            <div key={i} className="text-white space-y-1">
              <h3 className="text-4xl font-black">{stat.value}</h3>
              <p className="text-blue-200 text-sm font-medium uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- COURSES SECTION --- */}
      <section className="px-8 py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="text-orange-600 border-orange-200 bg-orange-50 font-bold px-4 py-1">OUR TOP PICKS</Badge>
            <h2 className="text-4xl font-black text-slate-900">Featured <span className="text-blue-600">Courses</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {courses.map((course, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-2xl transition-all border-none bg-white rounded-3xl group">
                <div className="h-56 overflow-hidden">
                  <img src={course.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <CardContent className="p-8 space-y-4">
                  <Badge className="bg-blue-50 text-blue-700 border-none font-bold uppercase text-[10px]">{course.category}</Badge>
                  <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-600 transition-colors">{course.title}</h3>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-sm font-bold text-slate-400">By {course.instructor}</span>
                    <span className="text-2xl font-black text-blue-600">{course.price}</span>
                  </div>
                  <Button className="w-full bg-slate-900 hover:bg-blue-600 rounded-xl h-12 font-bold" onClick={() => navigate("/signup")}>
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="px-8 py-32 bg-white max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black">What Our <span className="text-blue-600">Students Say</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Sami Mohamed", role: "Software Engineer", text: "Best platform in Somalia. I learned React here!", avatar: "https://i.pravatar.cc/150?u=1" },
            { name: "Aisha Abdi", role: "UI Designer", text: "The courses are professional and very easy to follow.", avatar: "https://i.pravatar.cc/150?u=2" },
            { name: "Rashid Khan", role: "Data Scientist", text: "Excellent support from the mentors. Highly recommended.", avatar: "https://i.pravatar.cc/150?u=3" }
          ].map((testi, i) => (
            <Card key={i} className="p-8 bg-blue-50/50 border-none rounded-[2rem] shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />)}
              </div>
              <p className="text-slate-600 italic mb-8 font-medium">"{testi.text}"</p>
              <div className="flex items-center gap-4">
                <img src={testi.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                <div>
                  <h4 className="font-black text-slate-900">{testi.name}</h4>
                  <p className="text-xs font-bold text-blue-600 uppercase">{testi.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 border-b border-slate-800 pb-16 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-xl">
                <GraduationCap className="text-white h-6 w-6" />
              </div>
              <span className="text-2xl font-black text-white uppercase tracking-tighter">Aqoon-Soor</span>
            </div>
            <p className="text-sm">Somalia's number one skills institute for modern education.</p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-white" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white" />
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400">Courses</a></li>
              <li><a href="#" className="hover:text-blue-400">Mentors</a></li>
              <li><a href="#" className="hover:text-blue-400">Scholarships</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms</a></li>
            </ul>
          </div>
          <div className="space-y-4">
             <h4 className="text-white font-bold">Newsletter</h4>
             <p className="text-sm">Get news and course updates.</p>
             <Button className="bg-blue-600 hover:bg-blue-700 w-full font-bold h-12 rounded-xl">Subscribe</Button>
          </div>
        </div>
        <p className="text-center text-xs font-bold tracking-widest uppercase">© 2026 Aqoon-Soor Institute. All Rights Reserved.</p>
      </footer>
    </div>
  );
}