import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { registerUser, loginUser } from './db.js';
import { hashPassword, comparePassword } from './utils/paswword.js';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected successfully!' });
});

// Register endpoint
app.post('/register', async (req, res) => {
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
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error registering user' 
    });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
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
      { id: user.User_ID, role: user.User_Role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { User_Password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error during login' 
    });
  }
});

// Delete player endpoint
app.delete('/api/players/:id', async (req, res) => {
  try {
    const playerId = req.params.id;

    // First check if player exists
    const [player] = await pool.execute(
      'SELECT * FROM Player WHERE Player_ID = ?',
      [playerId]
    );

    if (!player || player.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Player not found'
      });
    }

    // Delete related records first (due to foreign key constraints)
    await pool.execute(
      'DELETE FROM Performance WHERE Player_ID = ?',
      [playerId]
    );

    await pool.execute(
      'DELETE FROM PlayerStats WHERE Player_ID = ?',
      [playerId]
    );

    await pool.execute(
      'DELETE FROM report WHERE Player_ID = ?',
      [playerId]
    );

    // Finally delete the player
    await pool.execute(
      'DELETE FROM Player WHERE Player_ID = ?',
      [playerId]
    );

    res.json({
      success: true,
      message: 'Player deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting player:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete player'
    });
  }
});

// Check if player exists endpoint
app.get('/api/players/check/:name', async (req, res) => {
  const playerName = req.params.name;

  try {
    const [players] = await pool.execute(
      'SELECT COUNT(*) as count FROM Player WHERE Player_Name = ?',
      [playerName]
    );

    const exists = players[0].count > 0;

    return res.json({
      success: true,
      exists,
      message: exists ? 'Player found in database' : 'Player not found in database'
    });

  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while checking player existence',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// GET endpoint for fetching/searching players
app.get('/api/players', async (req, res) => {
  const searchTerm = req.query.search;

  try {
    let query = 'SELECT * FROM Player';
    let params = [];

    if (searchTerm) {
      query = 'SELECT * FROM Player WHERE Player_Name LIKE ?';
      params = [`%${searchTerm}%`];
    }

    const [results] = await pool.execute(query, params);

    return res.json({
      success: true,
      players: results,
      count: results.length
    });

  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching players',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

// POST endpoint for adding a new player
app.post('/api/players', async (req, res) => {
  const { Player_Name, Player_Age, Player_Team, Player_Role, Player_Type } = req.body;

  if (!Player_Name || !Player_Age || !Player_Team || !Player_Role || !Player_Type) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  try {
    const query = `
      INSERT INTO Player 
      (Player_Name, Player_Age, Player_Team, Player_Role, Player_Type) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const params = [Player_Name, Player_Age, Player_Team, Player_Role, Player_Type];

    const [result] = await pool.execute(query, params);
    
    const [newPlayer] = await pool.execute(
      'SELECT * FROM Player WHERE Player_ID = ?', 
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: 'Player added successfully',
      player: newPlayer[0]
    });

  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while adding the player',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});