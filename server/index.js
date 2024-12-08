import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import { authenticateToken } from './middleware/auth.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration with more detailed options
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'], // Allowed headers
  exposedHeaders: ['Set-Cookie'], // Expose these headers
  maxAge: 600 // Cache preflight requests for 10 minutes
}));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use('/', (req,res)=> res.json({message:"hello thre"}));
// Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});