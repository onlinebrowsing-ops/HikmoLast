import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';

export default function EditLesson(){
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lesson, setLesson] = useState({title:'', videoUrl:'', duration:'', content:''});

  useEffect(()=>{
    const fetch = async ()=>{
      setLoading(true);
      try{
        const res = await axios.get(`http://localhost:5000/api/courses/${id}/lessons/${lessonId}`);
        setLesson(res.data || {});
      }catch(err){console.error(err); alert('Failed to load lesson')}
      finally{setLoading(false)}
    }
    fetch();
  },[id,lessonId]);

  const handleSave = async (e)=>{
    e.preventDefault();
    if(!lesson.title || !lesson.videoUrl){ alert('Title and video URL required'); return }
    setSaving(true);
    try{
      await axios.patch(`http://localhost:5000/api/courses/${id}/lessons/${lessonId}`, lesson);
      alert('Lesson updated');
      navigate(`/admin/courses/${id}/lessons`);
    }catch(err){console.error(err); alert('Failed to update')}
    finally{setSaving(false)}
  }

  return (
    <div className="max-w-3xl mx-auto p-6 text-left">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 font-bold">
        <ArrowLeft className="mr-2 h-4 w-4" /> BACK
      </Button>
      <h1 className="text-3xl font-black mb-6">Edit Lesson</h1>
      <form onSubmit={handleSave}>
        <Card className="p-6">
          <CardContent className="space-y-4">
            {loading ? <p className="text-slate-400">Loading...</p> : (
              <>
                <div>
                  <Label className="text-xs uppercase font-bold text-slate-400">Title</Label>
                  <Input value={lesson.title || ''} onChange={e=>setLesson(l=>({...l,title:e.target.value}))} className="h-12" />
                </div>
                <div>
                  <Label className="text-xs uppercase font-bold text-slate-400">Video URL</Label>
                  <Input value={lesson.videoUrl || ''} onChange={e=>setLesson(l=>({...l,videoUrl:e.target.value}))} className="h-12" />
                </div>
                <div>
                  <Label className="text-xs uppercase font-bold text-slate-400">Duration</Label>
                  <Input value={lesson.duration || ''} onChange={e=>setLesson(l=>({...l,duration:e.target.value}))} className="h-12" />
                </div>
                <div>
                  <Label className="text-xs uppercase font-bold text-slate-400">Content</Label>
                  <textarea value={lesson.content || ''} onChange={e=>setLesson(l=>({...l,content:e.target.value}))} className="w-full rounded-md p-3 min-h-[120px]" />
                </div>
                <div>
                  <Button type="submit" disabled={saving} className="bg-blue-600 w-full h-12">{saving? 'Saving...': <> <Save className="mr-2"/> Save</>}</Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
