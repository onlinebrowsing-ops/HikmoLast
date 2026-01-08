import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: String, required: true }, // Verified from image_74cce7
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, default: "" },
  lessons: { type: Array, default: [] }        // Matches image_74cce7
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);