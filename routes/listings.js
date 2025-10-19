import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import listingSchema from "../schema.js";
import Listing from "../models/listing.js";
import { isLoggedIn, isOwner } from "../middleware.js";

const router = express.Router();

const validateListing = (req, res, next) => {
  const { title, description, filename, url, price, location, country } =
    req.body;
  const newItem = {
    title,
    description,
    image: {
      filename,
      url,
    },
    price,
    location,
    country,
  };
  const { error } = listingSchema.validate(newItem);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(500, errMsg);
  } else {
    next();
  }
};

router.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const data = await Listing.find({});
    res.render("listings/index.ejs", { data, user: req.user });
  })
);
router.get(
  "/view/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");
    if (!item) {
      req.flash("error", "Couldn't fetch the listing !!");
      return res.redirect("/listings");
    }
    return res.render("listings/item.ejs", { item, user: req.user });
  })
);
router.get("/new", isLoggedIn, isOwner, (req, res, next) => {
  res.render("listings/new.ejs", { user: req.user });
});
router.post(
  "/new",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(async (req, res) => {
    const { title, description, filename, url, price, location, country } =
      req.body;
    const newItem = {
      title,
      description,
      image: {
        filename,
        url,
      },
      price,
      location,
      country,
    };
    newItem.owner = req.user._id;
    const item = await Listing.insertOne(newItem);
    if (item) req.flash("success", "New Listing created successfully");
    res.redirect("/listings");
  })
);
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).select("owner");
    const userId = req.user._id;
    if (listing.owner._id.equals(userId)) {
      const item = await Listing.findById(id);
      if (!item) {
        req.flash("error", "Couldn't fetch the listing !!");
        return res.redirect("/listings");
      }
      res.render("listings/edit.ejs", { item, user: req.user });
    } else {
      req.flash("error", "You must be the owner of this listing to update it.");
      return res.redirect(`/listings/view/${id}`);
    }
  })
);
router.patch(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, filename, url, price, location, country } =
      req.body;
    const newItem = {
      title,
      description,
      image: {
        filename,
        url,
      },
      price,
      location,
      country,
    };
    const item = await Listing.findByIdAndUpdate(id, newItem, {
      new: true,
    });
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/view/${item._id}`);
  })
);
router.delete(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).select("owner");
    const userId = req.user._id;
    if (listing.owner._id.equals(userId)) {
      await Listing.findByIdAndDelete(id);
      req.flash("success", "Listing deleted successfully!");
      return res.redirect("/listings");
    } else {
      req.flash("error", "You must be the owner of this listing to delete it.");
      return res.redirect(`/listings/view/${id}`);
    }
  })
);

export default router;
