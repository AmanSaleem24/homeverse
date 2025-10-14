import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import ExpressError from "./utils/ExpressError.js";
import listingRoutes from "./routes/listings.js";
import reviewRoutes from "./routes/reviews.js";

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

app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);

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
