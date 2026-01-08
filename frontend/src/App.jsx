import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard"; 
import MyCourses from "./pages/MyCourses";
import CoursePlayer from "./pages/CoursePlayer"; 

// ADMIN COMPONENTS & PAGES
import AdminLayout from "./components/AdminLayout.jsx"; 
import AdminManageCourses from "./pages/AdminManageCourses.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminAddCourse from "./pages/AdminAddCourse.jsx";
import AddLesson from "./pages/AddLesson.jsx";
import LessonsList from "./pages/LessonsList.jsx";
import EditLesson from "./pages/EditLesson.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* --- DADWEYNAHA & AUTH --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* --- BOGAGGA ARDAYDA --- */}
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/my-courses" element={<MyCourses />} />
        
        {/* Course ID-ga halkan ayuu ka gudbayaa si uu Lesson-ka u soo saaro */}
        <Route path="/course/:id/learn" element={<CoursePlayer />} />

        {/* --- BOGAGGA ADMIN-KA (Lagu dhex riday Layout-ka guud) --- */}
        {/* FIIRO GAAR AH: Bog kasta oo halkan ku jira wuxuu si toos ah u dhaxli doonaa 
            Sidebar-ka madow ee ku jira AdminLayout.jsx. 
        */}
        
        {/* 1. Admin Overview (Tirada guud) */}
        <Route 
          path="/admin" 
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          } 
        />

        {/* 2. Maamulka Koorsooyinka (Ku darista, Bedelida & Tirtirista) */}
        <Route 
          path="/admin/courses" 
          element={
            <AdminLayout>
              <AdminManageCourses />
            </AdminLayout>
          } 
        
        />

        {/* 3. Koorsooyinka Cusub */}
        <Route 
          path="/admin/courses/new" 
          element={
            <AdminLayout>
              <AdminAddCourse />
            </AdminLayout>
          } 
        />

        <Route
          path="/admin/courses/:id/add-lesson"
          element={
            <AdminLayout>
              <AddLesson />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/courses/:id/lessons"
          element={
            <AdminLayout>
              <LessonsList />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/courses/:id/lessons/:lessonId/edit"
          element={
            <AdminLayout>
              <EditLesson />
            </AdminLayout>
          }
        />

        {/* Haddii jid khaldan la qoro, dib ugu celi Home ama Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;