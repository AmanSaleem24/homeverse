import Review from "../models/reviews.js";
import Listing from "../models/listing.js";

const createReview = async (req, res) => {
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
    author: req.user._id,
  });
  const review = await newReview.save();
  const listing = await Listing.findByIdAndUpdate(
    id,
    { $push: { reviews: review._id } },
    { new: true }
  ).populate("reviews");
  if (listing) {
    req.flash("success", "Review created successfully!");
  } else {
    req.flash("error", "Review not added!");
  }
  res.redirect(`/listings/view/${listing._id}`);
};
const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;

  const del = await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  const del1 = await Review.findByIdAndDelete(reviewId);
  if (del && del1) {
    req.flash("success", "Review deleted successfully!");
  } else {
    req.flash("error", "Review not deleted!");
  }
  res.redirect(`/listings/view/${id}`);
};
export { createReview, deleteReview };
