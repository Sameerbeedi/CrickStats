# CrickStats<br>
CrickStats is a database management system (DBMS) project that utilizes MySQL for data storage, with a Node.js backend and a React.js + TypeScript frontend. The project leverages the Axios API to seamlessly link the backend and frontend components.

## Features<br>
- MySQL: Used for data storage, including DDL statements, CRUD operations, triggers, stored functions, and procedures.<br>
- Node.js: Backend implementation.<br>
- React.js + TypeScript: Frontend development.<br>
- Axios: API integration to connect frontend and backend.<br>
- Authentication: Includes signup and login logic.<br>
## Project Structure<br>
### Backend (Server Directory)<br>
Contains all backend logic.<br>
### Run the backend server from this directory using:<br>
 ```bash
 cd server
```
```bash 
node index.js
```
### Frontend (src Directory)<br>
- Components: Houses reusable UI components like tables and forms.<br>
- Context: Contains authentication logic for signup and login functionality.<br>
- Pages: Implements the frontend design for various pages of the application.<br>
- Services: Manages API implementations linking the frontend and backend.<br>
- App.tsx: Central file for route definitions.<br>
- index.css: Defines the styling for the application.<br>
### SQL Directory<br>
Includes SQL files with:<br>
- DDL statements<br>
- CRUD operations<br>
- Triggers<br>
- Stored functions and procedures<br>
## How to Run the Project<br>
1. Open two terminals.<br>
2. In the first terminal, navigate to the server directory:<br>
 ```bash
  cd server
  ```
 ```bash
 node index.js
```
3. In the second terminal, start the frontend server:<br>
```bash
npm run dev
```
5. Open your browser to access the login page and start using the application.
## Technologies Used<br>
- Database: MySQL
- Backend: Node.js
- Frontend: React.js, TypeScript
- API Integration: Axios
