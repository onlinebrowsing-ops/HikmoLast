import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';

export default function LessonsList(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState([]);

  const fetch = async () => {
    setLoading(true);
    try{
      const res = await axios.get(`http://localhost:5000/api/courses/${id}/lessons`);
      setLessons(res.data || []);
    }catch(err){
      console.error('Failed to load lessons', err);
    }finally{setLoading(false)}
  }

  useEffect(()=>{fetch()},[id]);

  const handleDelete = async (lessonId) => {
    if(!window.confirm('Delete this lesson?')) return;
    try{
      setDeleting(s=>[...s,lessonId]);
      await axios.delete(`http://localhost:5000/api/courses/${id}/lessons/${lessonId}`);
      setLessons(s=>s.filter(l=>`${l._id}`!==`${lessonId}`));
    }catch(err){
      console.error(err); alert('Failed to delete');
    }finally{setDeleting(s=>s.filter(x=>x!==lessonId))}
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black">Lessons</h1>
        <Button onClick={()=>navigate(`/admin/courses/${id}/add-lesson`)} className="bg-blue-600">+ Add Lesson</Button>
      </div>

      <Card>
        <CardHeader className="p-4"><CardTitle>Course Lessons</CardTitle></CardHeader>
        <CardContent>
          {loading ? <p className="text-slate-400">Loading...</p> : (
            lessons.length===0 ? <p className="text-slate-500">No lessons yet.</p> : (
              <ul className="space-y-3">
                {lessons.map(l=> (
                  <li key={l._id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                    <div>
                      <div className="font-bold">{l.title}</div>
                      <div className="text-sm text-slate-500">{l.duration || '—'} • {l.videoUrl}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={()=>navigate(`/admin/courses/${id}/lessons/${l._id}/edit`)} className="text-blue-600">
                        <Edit className="h-4 w-4" /> Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={()=>handleDelete(l._id)} disabled={deleting.includes(l._id)} className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          )}
        </CardContent>
      </Card>
    </div>
  )
}
