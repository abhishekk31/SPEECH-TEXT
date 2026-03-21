# 🎤 SPEECH-TEXT Application

A full-stack MERN application that converts speech into text and allows authenticated users to securely save, view, and manage their speech history.

---

🔹 **Key Features**

* 🎤 Real-time speech to text conversion
* 🔐 User authentication (Register & Login) using JWT
* 💾 Save speech history to database
* 📜 View user-specific history
* 🗑 Delete individual history records
* 🔒 Protected routes with authentication middleware
* 📱 Fully responsive modern UI

---

🔹 **Tech Stack**

Frontend

* React (Vite)
* Axios (API communication)
* CSS (custom styling)
* React Hooks

Backend

* Node.js
* Express.js
* MongoDB
* Mongoose (ODM)
* JWT (Authentication)
* bcrypt (Password hashing)
* CORS (Cross-Origin handling)

Architecture

* MVC Pattern (Model-View-Controller)
* REST API structure
* Token-based authentication

---

🔹 **Project Structure**

SPEECH-TEXT/
│
├── client/ → React frontend
│   ├── components/
│   ├── pages/
│   ├── utils/ (API calls using Axios)
│
├── server/ → Backend (Node + Express)
│   ├── models/ (Mongoose schemas)
│   ├── controllers/ (Business logic)
│   ├── routes/ (API routes)
│   ├── middleware/ (JWT authentication)
│
└── README.md

---

🔹 **Installation & Setup**

Clone the repository
git clone https://github.com/abhishekk31/SPEECH-TEXT.git

Frontend setup
cd client
npm install
npm run dev

Backend setup
cd server
npm install
npm start

---

🔹 **Environment Variables**

This project uses environment variables to securely manage sensitive data.

Create a `.env` file inside the **server** folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

⚠️ Note:
The `.env` file is not included in the repository for security reasons.

---

🔹 **API Features**

* POST /register → Register user
* POST /login → Login user
* POST /save → Save speech history
* GET /history → Get user history
* DELETE /delete/ → Delete history

---

🔹 **Security & Privacy**

* Passwords are securely hashed using bcrypt
* Authentication handled via JWT tokens
* Protected routes ensure only authorized access
* User-specific data isolation

---

🔹 **Deployment**

Frontend → Vercel
Backend → Render

---

🔹 **Developer**

Abhishek Sasane
📧 Email: [abhisheksasane212@gmail.com](mailto:abhisheksasane212@gmail.com)

---

🔹 **Future Enhancements**

* ✏️ Edit history feature
* 🔍 Search & filter history
* 🌙 Dark mode
* 🔔 Toast
* ☁️ Cloud storage improvements

---

✨ This project demonstrates full-stack development using the MERN stack with authentication, API integration, and modern UI practices.
