import Listing from "./models/listing.js";
import Review from "./models/reviews.js";
// auth.js
const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectURL = req.originalUrl;
    req.flash("error", "You must be logged in to access this page");
    return res.redirect("/user/login");
  }
  next();
};

const saveUrl = (req, res, next) => {
  console.log(req.session.redirectURL);
  if (req.session.redirectURL) {
    console.log("hit");
    res.locals.redirectURL = req.session.redirectURL;
    console.log("locals ", res.locals.redirectURL);
  }
  next();
};

const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (res.locals.curUser && !listing.owner._id.equals(res.locals.curUser._id)) {
    req.flash("error", "You do not have permission to do this action.");
    return res.redirect(`/listings/view/${id}`);
  }
  next();
};

const isAuthor = async (req, res, next) => {
  console.log("hit");
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);
  console.log(res.locals.curUser._id);
  console.log(review.author);
  if (res.locals.curUser && !review.author.equals(res.locals.curUser._id)) {
    req.flash("error", "You do not have permission to do this action.");
    return res.redirect(`/listings/view/${id}`);
  }
  next();
};

export { isLoggedIn, saveUrl, isOwner, isAuthor };
