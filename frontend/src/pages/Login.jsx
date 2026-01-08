import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 1. URL-ka Backend-ka ee Live-ka ah (Render)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation fudud
    if (!formData.email || !formData.password) {
      setError("Fadlan buuxi dhammaan meelaha banaan");
      setLoading(false);
      return;
    }

    try {
      // 2. Dirista xogta adigoo isticmaalaya API_URL-ka saxda ah
      const response = await axios.post(`${API_URL}/api/auth/login`, formData);
      
      // Kaydi Token-ka iyo xogta qofka
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // 3. U dir Dashboard-ka saxda ah iyadoo la eegayo doorashada (role)
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      // Qabashada khaladaadka ka imaanaya server-ka
      const message = err.response?.data?.message || "Xiriirka server-ka ayaa go'an";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

      <Card className="w-full max-w-md border-none shadow-[0_20px_50px_rgba(8,112,184,0.1)] rounded-[2.5rem] bg-white relative z-10">
        <CardHeader className="space-y-4 text-center pb-2">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-100">
              <LogIn className="text-white h-8 w-8" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-black tracking-tighter">Welcome Back</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Gali xogtaada si aad u sii wadato barashada
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-8 pt-4">
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-sm font-bold text-center p-3 rounded-xl animate-in fade-in duration-300">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="font-bold text-slate-700 ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-12 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                  required
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-slate-700 ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-12 h-12 bg-slate-50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
                  required
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Checking...
                </span>
              ) : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <p className="text-sm text-slate-500 font-medium">
              Weli account ma haysatid?{" "}
              <Link to="/signup" className="text-orange-600 font-bold hover:text-orange-700 transition-colors">
                Create Account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}