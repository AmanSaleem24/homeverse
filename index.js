import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import wrapAsync from "./utils/wrapAsync.js";
import ExpressError from "./utils/ExpressError.js";
import Joi from "joi";
import listingSchema from "./schema.js";

import Listing from "./models/listing.js";

const PORT = 8080;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then((res) => {
    console.log(`Connection established successfully with DB`);
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

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

app.get(
  "/listings",
  wrapAsync(async (req, res, next) => {
    const data = await Listing.find({});
    res.render("listings/index.ejs", { data });
  })
);

app.get(
  "/listings/view/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id);
    res.render("listings/item.ejs", { item });
  })
);

app.get("/listings/new", (req, res, next) => {
  res.render("listings/new.ejs");
});
app.post(
  "/listings/new",
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
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const item = await Listing.findById(id);
    res.render("listings/edit.ejs", { item });
  })
);
app.patch(
  "/listings/:id/edit",
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
app.delete(
  "/listings/:id/delete",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

app.all("/:path", (req, res, next) => {
  throw new ExpressError(404, "Page not found");
});
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  console.log("Error fetching item:", err);
  res.status(status).render("listings/error.ejs", { message });
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
