import dotenv from 'dotenv';
dotenv.config(); // Load environment variables early

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import { authenticateToken } from './middleware/auth.js';

const app = express();

// Connect to MongoDB with error handling
const startServer = async () => {
  try {
    await connectDB();

    // Middleware
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); // Handle form data

    // CORS Configuration
    app.use(cors({
      origin: 'https://full-stack-app-93mu.vercel.app',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
      exposedHeaders: ['Set-Cookie'],
      maxAge: 600,
      optionsSuccessStatus: 200, // Fixes CORS issues for older browsers
    }));

    // Routes
    app.use('/api/auth', authRoutes);

    // Protected route example
    app.get('/api/protected', authenticateToken, (req, res) => {
      res.json({ message: 'This is a protected route', user: req.user });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

startServer();
