import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { registerUser, loginUser } from './db.js';
import { hashPassword, comparePassword } from './utils/paswword.js';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import { validationResult } from 'express-validator';
import { registerValidator, loginValidator } from './middleware/validators.js';
import { auth, checkRole } from './middleware/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enhanced security middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};

// Validation middleware
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected successfully!' });
});

// Register endpoint
app.post(
  '/register',
  registerValidator,
  validateRequest,
  async (req, res, next) => {
    try {
      const { username, email, password, role } = req.body;
      
      const hashedPassword = await hashPassword(password);
      
      const userId = await registerUser({
        Username: username,
        User_Email: email,
        User_Password: hashedPassword,
        User_Role: role || 'Fan'
      });

      res.status(201).json({ 
        success: true, 
        message: 'User registered successfully',
        userId 
      });
    } catch (error) {
      next(error);
    }
  }
);

// Login endpoint
app.post(
  '/login',
  loginValidator,
  validateRequest,
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
      const user = await loginUser(email);
      if (!user) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid email or password' 
        });
      }

      const isValid = await comparePassword(password, user.User_Password);
      if (!isValid) {
        return res.status(401).json({ 
          success: false, 
          message: 'Invalid email or password' 
        });
      }

      const token = jwt.sign(
        { 
          id: user.User_ID, 
          role: user.User_Role,
          email: user.User_Email 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      const { User_Password, ...userWithoutPassword } = user;

      // Set HTTP-only cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({
        success: true,
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      next(error);
    }
  }
);

// Protected routes
app.get(
  '/api/profile',
  auth,
  async (req, res) => {
    try {
      const user = await getUserById(req.user.id);
      const { User_Password, ...userProfile } = user;
      res.json({
        success: true,
        user: userProfile
      });
    } catch (error) {
      next(error);
    }
  }
);

// Admin only route example
app.get(
  '/api/admin/stats',
  auth,
  checkRole(['Admin']),
  async (req, res) => {
    try {
      // Admin specific logic here
      res.json({
        success: true,
        stats: {
          totalUsers: 100,
          activeMatches: 10,
          // ... other stats
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// Logout endpoint
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Apply error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});