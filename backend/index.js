const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const razorpayRoute = require("./routes/razorpay");
const cors = require("cors");
const { MONGO_URL, PASS_SEC, JWT_SEC } = require("./config/keys");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", razorpayRoute);

// if (process.env.NODE_ENV === "production") {
//   const path = require("path");

//   // Serve static files from the client/build directory
//   app.use(express.static(path.join(__dirname, "client", "build")));

//   // Fallback for all other routes to serve index.html
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running at port 5000!");
});
