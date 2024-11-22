CrickStats<br>
CrickStats is a database management system (DBMS) project that utilizes MySQL for data storage, with a Node.js backend and a React.js + TypeScript frontend. The project leverages the Axios API to seamlessly link the backend and frontend components.

Features
MySQL: Used for data storage, including DDL statements, CRUD operations, triggers, stored functions, and procedures.
Node.js: Backend implementation.
React.js + TypeScript: Frontend development.
Axios: API integration to connect frontend and backend.
Authentication: Includes signup and login logic.
Project Structure
Backend (Server Directory)
Contains all backend logic.
Run the backend server from this directory using:
cd server
node index.js<br>
Frontend (src Directory)
Components: Houses reusable UI components like tables and forms.
Context: Contains authentication logic for signup and login functionality.
Pages: Implements the frontend design for various pages of the application.
Services: Manages API implementations linking the frontend and backend.
App.tsx: Central file for route definitions.
index.css: Defines the styling for the application.
SQL Directory
Includes SQL files with:

DDL statements
CRUD operations
Triggers
Stored functions and procedures
How to Run the Project
Open two terminals.
In the first terminal, navigate to the server directory:
bash
Copy code
cd server
node index.js
In the second terminal, start the frontend server:
bash
Copy code
npm run dev
Open your browser to access the login page and start using the application.
Technologies Used
Database: MySQL
Backend: Node.js
Frontend: React.js, TypeScript
API Integration: Axios
