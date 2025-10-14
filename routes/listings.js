import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import listingSchema from "../schema.js";
import Listing from "../models/listing.js";

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
    res.render("listings/index.ejs", { data });
  })
);
router.get(
  "/view/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id).populate("reviews");
    res.render("listings/item.ejs", { item });
  })
);
router.get("/new", (req, res, next) => {
  res.render("listings/new.ejs");
});
router.post(
  "/new",
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
    await Listing.insertOne(newItem);
    res.redirect("/listings");
  })
);
router.get(
  "/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id);
    res.render("listings/edit.ejs", { item });
  })
);
router.patch(
  "/:id/edit",
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
    res.render("listings/item.ejs", { item });
  })
);
router.delete(
  "/:id/delete",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

export default router;
