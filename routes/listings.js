import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { storage } from "../cloudConfig.js";
import multer from "multer";
const upload = multer({ storage });

import { isLoggedIn, isOwner, validateListing } from "../middleware.js";
import {
  createListing,
  deleteListing,
  editListing,
  index,
  renderAddListingForm,
  renderEditListingForm,
  showItem,
} from "../controllers/listings.js";

const router = express.Router();

router.get("/", wrapAsync(index));
router.get("/view/:id", wrapAsync(showItem));
router.get("/new", isLoggedIn, renderAddListingForm);
router.post(
  "/new",
  isLoggedIn,
  upload.single("filename"),
  validateListing,
  wrapAsync(createListing)
);

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditListingForm));
router.patch(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  upload.single("file"),
  validateListing,
  wrapAsync(editListing)
);
router.delete("/:id/delete", isLoggedIn, isOwner, wrapAsync(deleteListing));

export default router;
