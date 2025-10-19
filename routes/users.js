import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.js";
import passport from "passport";
import { saveUrl } from "../middleware.js";
import Listing from "../models/listing.js";
import Review from "../models/reviews.js";
import {
  login,
  logout,
  renderLoginForm,
  renderSignupForm,
  signup,
} from "../controllers/users.js";

const router = express.Router();

router.get("/signup", renderSignupForm);
router.post("/signup", signup);
router.get("/login", renderLoginForm);
router.post(
  "/login",
  saveUrl,
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: true,
  }),
  login
);
router.get("/logout", logout);
export default router;
