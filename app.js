import dotenv from "dotenv";
if (process.env.NODE_ENV != "production") {
  dotenv.config();
}
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./db.js";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import ExpressError from "./utils/ExpressError.js";
import listingRoutes from "./routes/listings.js";
import reviewRoutes from "./routes/reviews.js";
import userRoutes from "./routes/users.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/user.js";

const PORT = 8080;
const app = express();
await connectDB();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new MongoStore({
  mongoUrl: process.env.MONGO_CONNECTION_URL,
  crypto: {
    secret: process.env.SESSION_SECRET_KEY,
  },
  touchAfter: 14 * 24 * 60 * 60,
});
store.on("error", () => {
  console.log("error in connecting to db", err);
});

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.info = req.flash("info");
  res.locals.curUser = req.user;
  next();
});

// global request logger – add near the top
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});
app.get("/", (req, res) => {
  res.redirect("/listings");
});
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/user", userRoutes);

app.all("/:path", (req, res, next) => {
  throw new ExpressError(404, "Page not found");
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("listings/error.ejs", { message, user: req.user });
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
