# 🏡 Homeverse — A Full-Stack Airbnb-Style Listing Platform

Homeverse (previously *homeAway*) is a full-stack web application built with **Node.js**, **Express**, **MongoDB (Atlas)**, and **EJS** templates.  
It allows users to browse, create, edit, and review vacation listings — much like Airbnb — with session-based authentication, image uploads, and a clean, responsive UI.

---

## 🚀 Live Demo
**🌐 [https://homeverse-hpah.onrender.com](https://homeverse-hpah.onrender.com)**  
_Deployed on Render with MongoDB Atlas as the database._

---

## 📸 Features

- 🏠 **Listings CRUD**
  - Create, read, update, and delete property listings
  - Each listing includes title, description, price, location, country, and image

- ⭐ **Reviews System**
  - Authenticated users can post and delete reviews
  - Ratings and comments visible under each listing

- 👤 **User Authentication**
  - Session-based login/register (Passport or custom middleware)
  - Flash messages for login/logout success and validation

- 💾 **MongoDB Atlas Integration**
  - Switched from local MongoDB to cloud-hosted Atlas cluster
  - Session data stored using `connect-mongo`

- 🖼️ **Image Uploads**
  - Local uploads (with Multer) or external URL support for listing images

- 🌍 **Responsive Frontend**
  - EJS + Bootstrap + custom CSS
  - Font Awesome icons and mobile-friendly layout

- 🔒 **Environment-Based Config**
  - Uses `.env` for sensitive data and deployment flexibility
  - Works seamlessly both locally and on Render

---

## 🛠️ Tech Stack

| Category | Technology |
|-----------|-------------|
| Backend | Node.js, Express |
| Database | MongoDB Atlas, Mongoose |
| Frontend | EJS, Bootstrap, Font Awesome |
| Auth | Express-Session, connect-mongo |
| Deployment | Render |
| Version Control | Git + GitHub |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/homeverse.git
cd homeverse
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Create a .env file
```bash
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/homeverse"
SESSION_SECRET="your_session_secret"
PORT=8080
BASE_URL=http://localhost:8080
```
🔐 On Render, set the same environment variables in your Environment tab.

### 4️⃣ Run the app locally
```bash
npm start
```
Then open http://localhost:8080

## Folder Structure
```bash
homeverse/
│
├── models/
│ ├── listing.js
│ ├── user.js
│ └── review.js
│
├── routes/
│ ├── listings.js
│ ├── users.js
│ └── reviews.js
│
├── views/
│ ├── listings/
│ ├── users/
│ ├── partials/
│ └── layouts/
│
├── public/
│ ├── css/
│ └── js/
│
├── db.js
├── app.js / server.js
├── package.json
└── .env
```
