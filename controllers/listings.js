import Listing from "../models/listing.js";

const index = async (req, res, next) => {
  const data = await Listing.find({});
  res.render("listings/index.ejs", { data, user: req.user });
};
const showItem = async (req, res, next) => {
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
};
const renderAddListingForm = (req, res, next) => {
  res.render("listings/new.ejs", { user: req.user });
};
const createListing = async (req, res) => {
  console.log(req.body);
  const { title, description, price, location, country } = req.body;
  const url = req.file.path;
  const filename = req.file.filename;
  const newItem = {
    title,
    description,
    image: {
      url,
      filename,
    },
    price,
    location,
    country,
  };
  newItem.owner = req.user._id;
  console.log(newItem);
  const item = await Listing.insertOne(newItem);
  if (item) req.flash("success", "New Listing created successfully");
  res.redirect("/listings");
};
const renderEditListingForm = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).select("owner");
  const userId = req.user._id;
  if (listing.owner._id.equals(userId)) {
    const item = await Listing.findById(id);
    if (!item) {
      req.flash("error", "Couldn't fetch the listing !!");
      return res.redirect("/listings");
    }
    let imageUrl = item.image.url;
    imageUrl = imageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { item, user: req.user, imageUrl });
  } else {
    req.flash("error", "You must be the owner of this listing to update it.");
    return res.redirect(`/listings/view/${id}`);
  }
};
const editListing = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, location, country } = req.body;
  const url = req.file.path;
  const filename = req.file.filename;
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
};
const deleteListing = async (req, res, next) => {
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
};
export {
  index,
  showItem,
  renderAddListingForm,
  createListing,
  renderEditListingForm,
  editListing,
  deleteListing,
};
