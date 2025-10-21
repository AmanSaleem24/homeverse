import User from "../models/user.js";
const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};
const signup = async (req, res) => {
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
};
const renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};
const login = async (req, res, next) => {
  req.flash("success", "Welcome to HomeAway");
  res.redirect(res.locals.redirectURL || "/listings");
};
const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "Logged Out!");
    res.redirect("/listings");
  });
};
export { renderSignupForm, signup, renderLoginForm, login, logout };
