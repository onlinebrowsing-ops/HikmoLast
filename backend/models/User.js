import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, // Ma ogolaanayo labo qof oo isku email ah
    lowercase: true 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  role: { 
    type: String, 
    enum: ['student', 'admin'], 
    default: 'student' 
  }
}, { timestamps: true }); // Tani waxay si otomaatig ah u qoraysaa goorta qofka la diiwaangeliyey

const User = mongoose.model('User', userSchema);
export default User;