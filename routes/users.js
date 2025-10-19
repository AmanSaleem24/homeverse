import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import User from "../models/user.js";
import passport from "passport";
import { saveUrl } from "../middleware.js";
import Listing from "../models/listing.js";
import Review from "../models/reviews.js";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});
router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const user = await User.register(newUser, password);
    req.login(user, (err) => {
      if (err) return next(err);
      req.flash("success", "Signed Up!!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/user/signup");
  }
});
router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});
router.post(
  "/login",
  saveUrl,
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    failureFlash: true,
  }),
  async (req, res, next) => {
    req.flash("success", "Welcome to HomeAway");
    res.redirect(res.locals.redirectURL || "/listings");
  }
);
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "Logged Out!");
    res.redirect("/listings");
  });
});
export default router;
