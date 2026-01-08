import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// --- REGISTER (Hore ayaan u samaynay) ---
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email-kan horey ayaa loo diiwaangeliyey" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Waa lagu diiwaangeliyey! Hadda Login samayso." });
  } catch (error) {
    res.status(500).json({ message: "Cilad baa dhacday", error: error.message });
  }
};

// --- LOGIN (Kani waa qaybta cusub) ---
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Hubi haddii uu email-ku jiro database-ka
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email-kan laguma helin xogta" });

    // 2. Hubi in password-ku sax yahay
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Password-ka aad qortay ma saxna" });

    // 3. Samee JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } // Wuxuu dhacayaa 1 maalin ka dib
    );

    // 4. Soo celi xogta qofka (aan password-ka ku jirin) iyo token-ka
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Cilad baa dhacday", error: error.message });
  }
};