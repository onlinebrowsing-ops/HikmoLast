import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import enrollmentRoutes from './routes/enrollment.js';


// 1. Soo rar xogta qarsoon ee .env
dotenv.config();

const app = express();

// 2. Middlewares
app.use(cors({
  origin: "https://hikmo-last.vercel.app", 
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', enrollmentRoutes);



// 3. Isku-xirka MongoDB (Updated with error handling)
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    
    // Hubi haddii MONGO_URI uu jiro
    if (!uri) {
      console.error("❌ Cilad: MONGO_URI lagama helin faylka .env");
      return;
    }

    console.log("🔄 Isku dayaya inaan ku xirmo MongoDB...");
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Sug 5 ilbiriqsi kaliya
    });

    console.log(`✅ MongoDB Connected: Database-kaagu waa diyaar!`);
  } catch (error) {
    console.error("❌ Mongoose Connection Error:");
    console.error(error.message);

    // Haddii password-ku khaldan yahay
    if (error.message.includes("Authentication failed")) {
      console.log("👉 TALO: Password-ka aad ku qortay .env ma saxna. Fadlan dib u hubi password-ka User-ka.");
    } 
    // Haddii IP-ga weli la xannibayo
    else if (error.message.includes("ETIMEDOUT") || error.message.includes("ENOTFOUND")) {
      console.log("👉 TALO: Internet-kaaga ayaa xannibaya MongoDB. Isku day inaad isticmaasho Mobile Hotspot.");
    }
  }
};

connectDB();

// 4. Test Route
app.get('/', (req, res) => {
  res.send('Backend-ka Hikma waa uu shaqaynayaa...');
});

// 5. Port-ka Server-ka
const PORT = process.env.port || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server-ku wuxuu ku shaqaynayaa http://localhost:${PORT}`);
});

