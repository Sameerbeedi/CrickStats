import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Log to check if the environment variables are loaded properly
console.log('MySQL User:', process.env.MYSQL_USER);
console.log('MySQL Password:', process.env.MYSQL_PASSWORD);

// Create a MySQL connection pool using environment variables
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise();

// Function to test the connection
async function testConnection() {
    try {
        // Attempt to get a connection from the pool and query the database
        const [rows] = await pool.query("SELECT 1 + 1 AS solution");
        console.log("Connection successful! Test query result:", rows[0].solution);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    } finally {
        // End the pool connection
        pool.end();
    }
}

// Run the connection test
testConnection();
