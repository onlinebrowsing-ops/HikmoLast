import express from 'express';
import Course from '../models/Course.js';
import { createCourse, addLesson, getLessons, deleteLesson, getLessonById, updateLesson } from '../controllers/courseController.js';
const router = express.Router();

// 1. Soo saar dhamaan koorsooyinka (Dashboard)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Soo saar hal koorso oo leh Chapters-ka (CoursePlayer)
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Koorsada lama helin" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: "Cilad ayaa dhacday soo saarista koorsada" });
  }
});

// Create a new course (used by AdminAddCourse and Admin modal)
router.post('/', createCourse);

// Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete course', error: err.message });
  }
});

// Lessons routes
router.get('/:id/lessons', getLessons);
router.post('/:id/lessons', addLesson);
router.delete('/:id/lessons/:lessonId', deleteLesson);
router.get('/:id/lessons/:lessonId', getLessonById);
router.patch('/:id/lessons/:lessonId', updateLesson);

export default router;