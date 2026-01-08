import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
  // Aqoonsiga Ardayga (User ID)
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  // Aqoonsiga Koorsada (Course ID)
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course', 
    required: true 
  },
  enrolledAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Hubi inaan ardaygu hal koorso labo jeer isku diiwaangelin
EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

// Ka dhig export default halkii ay ka ahaan lahayd module.exports
const Enrollment = mongoose.model('Enrollment', EnrollmentSchema);
export default Enrollment;