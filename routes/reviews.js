import express from "express";
import Review from "../models/reviews.js";
import Listing from "../models/listing.js";
import wrapAsync from "../utils/wrapAsync.js";

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const rating = Number(req.body.rating);
    const content = req.body.content;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).send("Please pick stars 1–5.");
    }
    const newReview = new Review({
      comment: content,
      rating,
      createdAt: Date.now(),
    });
    const review = await newReview.save();
    const listing = await Listing.findByIdAndUpdate(
      id,
      { $push: { reviews: review._id } },
      { new: true }
    ).populate("reviews");
    res.redirect(`/listings/view/${listing._id}`);
  })
);
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId },
    });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/view/${id}`);
  })
);

export default router;
