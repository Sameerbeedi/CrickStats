import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'CrickStats',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = {
  // Method to create the Player table
  async createPlayerTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Player (
        Player_ID VARCHAR(5) PRIMARY KEY,
        Player_Name CHAR(20) UNIQUE NOT NULL,
        Player_Age INT NOT NULL,
        Player_Team CHAR(20),
        Player_Role ENUM('Captain','Vice-Captain','Player') DEFAULT 'Player',
        Player_Type ENUM('Batsman', 'Bowler', 'All-rounder'),
        Player_Stats JSON,
        Player_DOB DATE
      );
    `;
    await pool.execute(sql);
    console.log("Table 'Player' created or already exists.");
  },

  // Method to create the Team table
  async createTeamTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Team (
        Team_ID VARCHAR(5) PRIMARY KEY,
        Team_Name CHAR(20) UNIQUE NOT NULL,
        Team_Coach JSON
      );
    `;
    await pool.execute(sql);
    console.log("Table 'Team' created or already exists.");
  },

  // Method to create the C_Match table
  async createMatchTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS C_Match (
        Match_ID VARCHAR(5) PRIMARY KEY,
        Match_Date DATE,
        Match_Venue JSON,
        Match_Format ENUM('Test', 'ODI', 'T20I'),
        Team_A VARCHAR(5),
        Team_B VARCHAR(5),
        FOREIGN KEY (Team_A) REFERENCES Team(Team_ID),
        FOREIGN KEY (Team_B) REFERENCES Team(Team_ID)
      );
    `;
    await pool.execute(sql);
    console.log("Table 'C_Match' created or already exists.");
  },

  // Method to create the Series table
  async createSeriesTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Series (
        Series_ID VARCHAR(5) PRIMARY KEY,
        Series_Name VARCHAR(50) NOT NULL,
        Series_Type ENUM('Bilateral', 'Tri-series', 'World Cup', 'League', 'Others'),
        Host_Country CHAR(20),
        Series_start DATE,
        Series_end DATE,
        Participating_Teams JSON,
        Total_Matches INT,
        Winner CHAR(20)
      );
    `;
    await pool.execute(sql);
    console.log("Table 'Series' created or already exists.");
  },

  // Method to create the Performance table
  async createPerformanceTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Performance (
        Performace_ID VARCHAR(5) PRIMARY KEY,
        Match_ID VARCHAR(5) NOT NULL,
        Player_ID VARCHAR(5) NOT NULL,
        Player_Stats_Match JSON,
        FOREIGN KEY (Match_ID) REFERENCES C_Match(Match_ID),
        FOREIGN KEY (Player_ID) REFERENCES Player(Player_ID)
      );
    `;
    await pool.execute(sql);
    console.log("Table 'Performance' created or already exists.");
  },

  // Method to create the User table
  async createUserTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS User (
        User_ID VARCHAR(5) PRIMARY KEY,
        User_Role ENUM('Coach', 'Player', 'Fan'),
        Username CHAR(10) UNIQUE NOT NULL,
        User_Password VARCHAR(8) UNIQUE NOT NULL,
        User_Email VARCHAR(50) UNIQUE NOT NULL
      );
    `;
    await pool.execute(sql);
    console.log("Table 'User' created or already exists.");
  },

  // Method to create the Report table
  async createReportTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS Report (
        Report_ID VARCHAR(5) PRIMARY KEY,
        Team_ID VARCHAR(5) NOT NULL,
        Match_ID VARCHAR(5) NOT NULL,
        Player_ID VARCHAR(5) NOT NULL,
        Performance_Data JSON,
        FOREIGN KEY (Team_ID) REFERENCES Team(Team_ID),
        FOREIGN KEY (Match_ID) REFERENCES C_Match(Match_ID),
        FOREIGN KEY (Player_ID) REFERENCES Player(Player_ID)
      );
    `;
    await pool.execute(sql);
    console.log("Table 'Report' created or already exists.");
  },

  // Method to insert data into the Player table
  // async insertPlayerData() {
  //   const insertSQL = `
  //     INSERT INTO Player (Player_ID, Player_Name, Player_Age, Player_Team, Player_Role, Player_Type, Player_Stats, Player_DOB)
  //     VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  //   `;
  //   await pool.execute(insertSQL, ['P001', 'Virat Kohli', 34, 'India', 'Captain', 'Batsman', '{"matches": 254, "runs": 12000}', '1988-11-05']);
  //   console.log("Data inserted into 'Player' table.");
  // },

  // Method to insert data into the Team table
  // async insertTeamData() {
  //   const insertSQL = `
  //     INSERT INTO Team (Team_ID, Team_Name, Team_Coach)
  //     VALUES (?, ?, ?);
  //   `;
  //   await pool.execute(insertSQL, ['T001', 'India', '{"name": "Rahul Dravid"}']);
  //   console.log("Data inserted into 'Team' table.");
  // },

  // async query<T>(sql: string, params?: any[]): Promise<T[]> {
  //   const [rows] = await pool.execute(sql, params);
  //   return rows as T[];
  // },

  // async queryOne<T>(sql: string, params?: any[]): Promise<T | null> {
  //   const rows = await this.query<T>(sql, params);
  //   return rows[0] || null;
  // }
};

// Example usage
(async () => {
  await db.createPlayerTable();
  await db.createTeamTable();
  await db.createMatchTable();
  await db.createSeriesTable();
  await db.createPerformanceTable();
  await db.createUserTable();
  await db.createReportTable();

  // Insert sample data
  //await db.insertPlayerData();
  //await db.insertTeamData();
})();
