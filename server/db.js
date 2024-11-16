import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

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

export const registerUser = async (user) => {
  const [result] = await pool.execute(
    'INSERT INTO User (Username, User_Role, User_Password, User_Email) VALUES (?, ?, ?, ?)',
    [user.Username, user.User_Role, user.User_Password, user.User_Email]
  );
  return result.insertId;
};

export const loginUser = async (email) => {
  const [rows] = await pool.execute(
    'SELECT * FROM User WHERE User_Email = ?',
    [email]
  );
  return rows[0];
};

export const addPlayer = async (player) => {
  const [result] = await pool.execute(
    'INSERT INTO Player (Player_Name, Player_Age, Player_Team, Player_Role, Player_Type, Player_Stats, Player_DOB) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [player.Player_Name, player.Player_Age, player.Player_Team, player.Player_Role, player.Player_Type, JSON.stringify(player.Player_Stats), player.Player_DOB]
  );
  return result.insertId;
};

export const addTeam = async (team) => {
  const [result] = await pool.execute(
    'INSERT INTO Team (Team_Name, Team_Coach) VALUES (?, ?)',
    [team.Team_Name, JSON.stringify(team.Team_Coach)]
  );
  return result.insertId;
};

export const addMatch = async (match) => {
  const [result] = await pool.execute(
    'INSERT INTO C_Match (Match_Date, Match_Venue, Match_Format, Team_A, Team_B) VALUES (?, ?, ?, ?, ?)',
    [match.Match_Date, JSON.stringify(match.Match_Venue), match.Match_Format, match.Team_A, match.Team_B]
  );
  return result.insertId;
};

export const addStats = async (stats) => {
  const [result] = await pool.execute(
    'INSERT INTO report (Team_ID, Match_ID, Player_ID, Performance_Data) VALUES (?, ?, ?, ?)',
    [stats.Team_ID, stats.Match_ID, stats.Player_ID, JSON.stringify(stats.Performance_Data)]
  );
  return result.insertId;
};

export const addPerformance = async (performance) => {
  const [result] = await pool.execute(
    'INSERT INTO Performance (Match_ID, Player_ID, PLayer_Stats_Match) VALUES (?, ?, ?)',
    [performance.Match_ID, performance.Player_ID, JSON.stringify(performance.PLayer_Stats_Match)]
  );
  return result.insertId;
};

export const registerAdmin = async (userId) => {
  const [result] = await pool.execute(
    'UPDATE User SET User_Role = ? WHERE User_ID = ?',
    ['Admin', userId]
  );
  return result.affectedRows > 0;
};