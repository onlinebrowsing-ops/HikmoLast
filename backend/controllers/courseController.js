import Course from '../models/Course.js';
import mongoose from 'mongoose';

// @desc    Create a new course
// @route   POST /api/courses
export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, price, image, category, lessons } = req.body;

    // 1. Basic Validation to prevent empty database entries
    if (!title || !description || !instructor || !price || !category) {
      return res.status(400).json({ 
        message: "Validation Failed: title, description, instructor, price, and category are required." 
      });
    }

    const newCourse = new Course({
      title,
      description,
      instructor, // Matches your existing schema: ObjectId('695f8f6e...') 
      price: Number(price), // Ensures price is stored as a Number in MongoDB
      image: image || "",   // Optional: defaults to empty string if not provided
      category,
      lessons: lessons || [] // Optional: defaults to an empty array
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    // 2. Returning the specific error message helps you debug in the frontend console
    res.status(500).json({ 
      message: "Server Error: Failed to create course", 
      error: error.message 
    });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
export const getAllCourses = async (req, res) => {
  try {
    // Sort by newest first
    const courses = await Course.find().sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error: error.message });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error: error.message });
  }
};

// Lessons: Add a lesson to a course
export const addLesson = async (req, res) => {
  try {
    const courseId = req.params.id;
    const { title, content, videoUrl, duration } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Validation Failed: lesson title is required.' });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const lesson = {
      _id: new mongoose.Types.ObjectId(),
      title,
      content: content || '',
      videoUrl: videoUrl || '',
      duration: duration || 0,
    };

    course.lessons.push(lesson);
    await course.save();

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add lesson', error: error.message });
  }
};

// Get lessons for a course
export const getLessons = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).select('lessons');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course.lessons || []);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lessons', error: error.message });
  }
};

// Delete a lesson from a course
export const deleteLesson = async (req, res) => {
  try {
    const { id, lessonId } = req.params;
    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const originalCount = course.lessons.length;
    course.lessons = course.lessons.filter(l => `${l._id}` !== `${lessonId}`);
    if (course.lessons.length === originalCount) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    await course.save();
    res.status(200).json({ message: 'Lesson deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete lesson', error: error.message });
  }
};

// Get single lesson by id
export const getLessonById = async (req, res) => {
  try {
    const { id, lessonId } = req.params;
    const course = await Course.findById(id).select('lessons');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const lesson = course.lessons.find(l => `${l._id}` === `${lessonId}`);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch lesson', error: error.message });
  }
};

// Update a lesson
export const updateLesson = async (req, res) => {
  try {
    const { id, lessonId } = req.params;
    const { title, content, videoUrl, duration } = req.body;

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const lesson = course.lessons.id(lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    if (title !== undefined) lesson.title = title;
    if (content !== undefined) lesson.content = content;
    if (videoUrl !== undefined) lesson.videoUrl = videoUrl;
    if (duration !== undefined) lesson.duration = duration;

    await course.save();
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update lesson', error: error.message });
  }
};