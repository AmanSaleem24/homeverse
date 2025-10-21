import mongoose, { Schema } from "mongoose";
import Review from "./reviews.js";

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    filename: String,
    url: String,
  },

  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});
listingSchema.post("findOneAndDelete", async (data) => {
  console.log("Post Middleware hit");
  if (data.reviews.length) {
    const result = await Review.deleteMany({ _id: { $in: data.reviews } });
    if (result) console.log(result);
  }
});

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
