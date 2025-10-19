import mongoose, { Schema } from "mongoose";
import Review from "./reviews.js";
main().catch((err) => {
  console.log(err);
});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}
const defLink =
  "https://images.unsplash.com/photo-1611771341253-dadb347165a8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
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
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default: defLink,
      set: (v) => (v === "" ? defLink : v),
    },
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
