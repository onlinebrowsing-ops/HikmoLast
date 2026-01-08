import express from 'express';
const router = express.Router();
import Enrollment from '../models/Enrollment.js'; // Hubi inuu .js ku dhammaado

// 1. ADD: Marka ardaygu gujiyo "Enroll Now"
router.post('/enroll', async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    
    // Waxaan hubinaynaa in xogtu jirto
    if (!userId || !courseId) {
      return res.status(400).json({ message: "UserId iyo CourseId waa loo baahan yahay." });
    }

    const newEnroll = new Enrollment({ student: userId, course: courseId });
    await newEnroll.save();
    res.status(201).json({ message: "Waad is diiwaangelisay! 🎉" });
  } catch (err) {
    // Haddii ardaygu horay u lahaa koorsada (Unique Index Error)
    res.status(400).json({ message: "Horay ayaad u lahayd koorsadan." });
  }
});

// 2. DELETE: Marka ardaygu gujiyo "Unenroll" (Badhanka Trash-ka)
router.delete('/unenroll/:courseId/:userId', async (req, res) => {
  try {
    const result = await Enrollment.findOneAndDelete({ 
      course: req.params.courseId, 
      student: req.params.userId 
    });

    if (!result) {
      return res.status(404).json({ message: "Koorsada lama helin." });
    }

    res.json({ message: "Si guul leh ayaad isaga saartay koorsada." });
  } catch (err) {
    res.status(500).json({ message: "Cilad ayaa dhacday." });
  }
});

// 3. GET: Soo saar kaliya koorsooyinka uu ardaygan leeyahay (My Courses)
router.get('/my-courses/:userId', async (req, res) => {
  try {
    // .populate('course') waxay keeneysaa dhamaan faahfaahinta koorsada (title, image, etc.)
    const courses = await Enrollment.find({ student: req.params.userId }).populate('course');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Xogta lama soo helin." });
  }
});

// KHADKAN WAA MUHIIM SI UU SERVER.JS U AQOONSADO
export default router;