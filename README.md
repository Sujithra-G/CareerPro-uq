📌 Career Pro – Career Guidance Web Application

Career Pro is a web-based career guidance platform that helps users explore suitable career paths based on their interests, skills, and preferences. It provides career recommendations, role details, and guidance resources in a simple and user-friendly way.

🚀 Features

User Registration & Login

Career Recommendation based on user inputs

Career Categories (IT, Core, Business, Design, etc.)

Career Role Details (skills required, roadmap, scope)

Simple Dashboard for users

Responsive UI

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript
Backend: Java (JDBC)
Database: MySQL

⚙️ Setup Instructions
1️⃣ Clone the Project
git clone <your-repo-link>
cd career-pro

2️⃣ Database Setup (MySQL)

Open MySQL Workbench / MySQL CLI

Create a database:

CREATE DATABASE career_pro;


Import the SQL file (if provided):

SOURCE career_pro.sql;

3️⃣ Configure Database Connection

Go to your Java DB connection file and update:

String url = "jdbc:mysql://localhost:3306/career_pro";
String user = "root";
String password = "your_password";

4️⃣ Run the Backend (Java)

Compile and run your main Java file:

javac Main.java
java Main


(If you are using Eclipse/IntelliJ, just click Run.)

5️⃣ Run the Frontend

Open the frontend file directly in browser:

index.html

OR run using VS Code Live Server extension.

📂 Project Folder Structure (Sample)
career-pro/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── dashboard.html
│   ├── css/
│   └── js/
│
├── backend/
│   ├── Main.java
│   ├── DBConnection.java
│   ├── UserDAO.java
│   └── CareerDAO.java
│
├── database/
│   └── career_pro.sql
│
└── README.md

✅ How to Use

Register a new account

Login with your credentials

Fill interest/skill details

View career recommendations

Explore career roadmap and guidance
