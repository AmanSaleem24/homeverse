import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";

import Listing from "./models/listing.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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

app.get("/listings", async (req, res) => {
  try {
    const data = await Listing.find({});
    res.render("listings/index.ejs", { data });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).send("Something went wrong while fetching listings.");
  }
});
app.get("/listings/view/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Listing.findById(id);
    res.render("listings/item.ejs", { item });
  } catch (err) {
    console.log("Error fetching item:", err);
    res.status(500).send("Something went wrong while fetching item.");
  }
});
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});
app.post("/listings/new", (req, res) => {
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
  try {
    Listing.insertOne(newItem);
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
app.get("/listings/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Listing.findById(id);
    res.render("listings/edit.ejs", { item });
  } catch (err) {
    console.log(`Error fetching the item : ${err}`);
    res.status(500).send(`Error fetching the item : ${err}`);
  }
});
app.patch("/listings/edit/:id", async (req, res) => {
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
  try {
    const item = await Listing.findByIdAndUpdate(id, newItem, { new: true });
    console.log(item);
    res.render("listings/item.ejs", { item });
  } catch (err) {
    console.log(`Error fetching the item : ${err}`);
    res.status(500).send(`Error fetching the item : ${err}`);
  }
});
const PORT = 8080;
app.delete("/listings/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  } catch (err) {
    console.log(`Error fetching the item : ${err}`);
    res.status(500).send(`Error fetching the item : ${err}`);
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
