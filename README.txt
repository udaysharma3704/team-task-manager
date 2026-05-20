========================================================================
TEAM TASK MANAGER APPLICATION
========================================================================
Author: Uday Sharma
Stack: MERS Stack (MySQL, Express, React, Node.js)
Live Demo URL: [Paste your live link here, or write "Local Host Deployment"]
GitHub Repository: https://github.com/udaysharma3704/team-task-manager

------------------------------------------------------------------------
1. PROJECT OVERVIEW
------------------------------------------------------------------------
The Team Task Manager is a full-stack production application built to
streamline project lifecycles, resource assignments, and milestone
tracking. Features include secure role-based registration (Admin/Member),
relational project data modeling, dynamic task creation, and a real-time 
performance metrics dashboard tracking active development sprint states.

------------------------------------------------------------------------
2. CORE TECH ARCHITECTURE
------------------------------------------------------------------------
* Frontend Interface: React (Vite environment), Context API, Lucide Icons
* Backend API Engine: Node.js, Express Router Framework
* Relational Database: MySQL Server handled via Sequelize ORM Layer
* Authentication: JSON Web Tokens (JWT) & client-side security routing

------------------------------------------------------------------------
3. SETUP & LOCAL RUN INSTRUCTIONS
------------------------------------------------------------------------
To boot and run this application engine locally on a machine:

Step 1: Database Setup
- Open MySQL Workbench and ensure a database named 'taskmanager' exists.

Step 2: Environment Configuration
- In the backend directory, ensure your database connection parameters
  (DB_HOST, DB_USER, DB_PASSWORD) match your local root setup.

Step 3: Run the Compilation and Servers
- Open your terminal inside the root workspace folder and execute:
    npm run build-client
- Start the server layers side-by-side using:
    npm run dev --prefix backend
    npm run dev --prefix client

The frontend application will boot and become active at http://localhost:5173
========================================================================