# 🏠 Homeverse

> **An Airbnb-style full-stack web app** for listing, browsing, and reviewing vacation properties. Built with Node.js, Express, MongoDB Atlas, and EJS — featuring user authentication, Cloudinary image uploads, Mapbox maps, and a clean responsive UI.

<p align="center">
  <a href="https://homeverse-hpah.onrender.com">
    <img src="https://img.shields.io/badge/Live_Demo-homeverse.onrender.com-F97316?style=for-the-badge&logo=render&logoColor=white" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/EJS-B4CA65?style=flat-square&logo=ejs&logoColor=black" />
  <img src="https://img.shields.io/badge/Passport.js-34E27A?style=flat-square&logo=passport&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/Mapbox-000000?style=flat-square&logo=mapbox&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white" />
</p>

---

## ✨ Features

**🏠 Listings CRUD**
- Create, read, update, and delete property listings
- Each listing includes title, description, price, location, country, and image
- Image uploads via **Cloudinary** with Multer middleware
- Server-side validation using **Joi** schemas

**⭐ Reviews System**
- Authenticated users can post and delete reviews
- Star ratings and comments displayed under each listing
- Reviews cascade-delete when a listing is removed

**👤 User Authentication**
- Session-based login/register powered by **Passport.js** + **passport-local-mongoose**
- Flash messages for login/logout success and validation errors
- Authorization middleware — only listing owners can edit/delete their properties

**🗺️ Interactive Maps**
- **Mapbox** integration for geocoding and map display
- Each listing shows its location on an interactive map
- Auto-geocoded from the location field during creation

**💾 MongoDB Atlas**
- Cloud-hosted MongoDB Atlas cluster for production reliability
- Session data stored using **connect-mongo** for persistent sessions
- Mongoose ODM with schema validation and population

**🌍 Responsive Frontend**
- Server-rendered views with **EJS** + **ejs-mate** layouts
- **Bootstrap 5** + custom CSS for a polished, mobile-friendly design
- Font Awesome icons throughout the UI

**🔒 Environment-Based Config**
- Uses `.env` for sensitive data (database URI, API keys, session secrets)
- Works seamlessly both locally and deployed on Render

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Runtime** | Node.js 22 |
| **Framework** | Express 5 (ES modules) |
| **Database** | MongoDB Atlas + Mongoose 8 |
| **Templating** | EJS + ejs-mate (layouts & partials) |
| **Auth** | Passport.js + passport-local-mongoose (session-based) |
| **Sessions** | express-session + connect-mongo (MongoDB store) |
| **File Upload** | Multer + multer-storage-cloudinary + Cloudinary SDK |
| **Maps** | Mapbox GL JS + @mapbox/mapbox-sdk (geocoding) |
| **Validation** | Joi (server-side schema validation) |
| **Styling** | Bootstrap 5 + custom CSS + Font Awesome |
| **Utilities** | connect-flash (flash messages), method-override (PUT/DELETE) |
| **Deployment** | Render (web service) |

---

## 📂 Project Structure

```
homeverse/
│
├── controllers/                  # Route handler logic
│   ├── listings.js               # Listing CRUD operations
│   ├── reviews.js                # Review create/delete
│   └── users.js                  # Register, login, logout
│
├── models/                       # Mongoose schemas
│   ├── listing.js                # Listing schema (title, price, image, location, owner)
│   ├── review.js                 # Review schema (rating, comment, author)
│   └── user.js                   # User schema (passport-local-mongoose)
│
├── routes/                       # Express route definitions
│   ├── listings.js               # /listings — CRUD routes
│   ├── reviews.js                # /listings/:id/reviews
│   └── users.js                  # /signup, /login, /logout
│
├── views/                        # EJS templates
│   ├── listings/                 # index, show, new, edit
│   ├── users/                    # signup, login
│   ├── partials/                 # navbar, footer, flash messages
│   └── layouts/                  # boilerplate.ejs (main layout)
│
├── public/                       # Static assets
│   ├── css/                      # Custom stylesheets
│   └── js/                       # Client-side scripts (map, form validation)
│
├── init/                         # Database seeding scripts
├── utils/                        # Error handling utilities (ExpressError, wrapAsync)
│
├── app.js                        # Express app — routes, middleware, session config
├── db.js                         # MongoDB connection setup
├── schema.js                     # Joi validation schemas
├── cloudConfig.js                # Cloudinary + Multer storage config
├── middleware.js                  # Auth & authorization middleware (isLoggedIn, isOwner)
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AmanSaleem24/homeverse.git
cd homeverse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file:
```env
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/homeverse"
SESSION_SECRET="your_session_secret"
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-secret
MAPBOX_TOKEN=pk.your-mapbox-token
PORT=8080
```

> 🔐 On **Render**, set the same environment variables in your **Environment** tab.

### 4. Seed the database (optional)
```bash
node init/index.js
```

### 5. Run the app locally
```bash
npm start
```

Open [http://localhost:8080](http://localhost:8080) to explore listings.

---

## 📜 License

This project is for personal/portfolio use.
