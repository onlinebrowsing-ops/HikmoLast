import React, { useState } from "react"; // Waxaan ku darnay useState
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Waxaan ku darnay useNavigate
import axios from "axios"; // Waxaan soo rarnay axios

export default function SignUp() {
  // 1. Gobolka xogta (State)
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 2. Shaqada gudbinta (Submit Function)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert(response.data.message);
      navigate("/login"); // U dir bogga login-ka hadduu guulaysto
    } catch (error) {
      alert(error.response?.data?.message || "Cilad baa dhacday");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <Card className="w-full max-w-md border-none shadow-[0_20px_50px_rgba(8,112,184,0.1)] rounded-[2.5rem] bg-white relative z-10">
        <CardHeader className="space-y-4 text-center pb-2">
          <div className="flex justify-center">
            <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-100">
              <Sparkles className="text-white h-8 w-8" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-black tracking-tighter">Start Learning</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Ku soo biir Aqoon-Soor si aad u hesho koorsooyin tayo leh
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <form className="space-y-4" onSubmit={handleSubmit}> {/* Ku dar onSubmit */}
            <div className="space-y-2">
              <Label className="font-bold text-slate-700 ml-1">Full Name</Label>
              <div className="relative">
                <User className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  placeholder="John Doe" 
                  className="pl-12 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-orange-500" 
                  required
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} // Xog qabasho
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700 ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-12 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-orange-500" 
                  required
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} // Xog qabasho
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-bold text-slate-700 ml-1">Create Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-3 h-5 w-5 text-slate-400" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-12 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-orange-500" 
                  required
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} // Xog qabasho
                />
              </div>
            </div>
            <Button 
              type="submit" 
              disabled={loading} // Iska ilaali in labo jeer la riixo
              className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-100 transition-all mt-2"
            >
              {loading ? "Processing..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-8 text-center border-t border-slate-50 pt-6">
            <p className="text-sm text-slate-500 font-medium">
              Horey account ma u lahayd?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}