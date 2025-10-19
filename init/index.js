import sampleData from "./data.js";
import Listing from "../models/listing.js";
import mongoose from "mongoose";
main().catch((err) => {
  console.log(err);
});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

const init = async () => {
  await Listing.deleteMany({});
  sampleData.data = sampleData.data.map((obj) => ({
    ...obj,
    owner: "68f3c5a317b1185bdbfe8478",
  }));
  await Listing.insertMany(sampleData.data);
  console.log("Data inserted successfully");
};
init();
// console.log(sampleData);
