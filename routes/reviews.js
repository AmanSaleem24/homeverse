import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { isLoggedIn, isAuthor } from "../middleware.js";
import { createReview, deleteReview } from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

router.post("/", isLoggedIn, wrapAsync(createReview));
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(deleteReview));

export default router;
