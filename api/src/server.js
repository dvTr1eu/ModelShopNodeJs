const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const authRouter = require("./routes/auth/auth-routes");
const adminProductRouter = require("./routes/admin/product-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const clientProductRouter = require("./routes/clientRoutes/product-routes");
const shopCartRouter = require("./routes/clientRoutes/cart-routes");
const shopAddressRouter = require("./routes/clientRoutes/address-routes");
const shopOrderRouter = require("./routes/clientRoutes/order-routes");
const shopSearchRouter = require("./routes/clientRoutes/search-routes");
const shopReviewRouter = require("./routes/clientRoutes/review-routes");

const commonFeatureRouter = require("./routes/commonRoutes/feature-routes");

const db = require("./config/db/connectDb");

db.connect();

const app = express();
const port = process.env.PORT || 8081;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/v1/api/auth", authRouter);
app.use("/v1/api/admin/product", adminProductRouter);
app.use("/v1/api/admin/order", adminOrderRouter);

app.use("/v1/api/client/product", clientProductRouter);
app.use("/v1/api/client/cart", shopCartRouter);
app.use("/v1/api/client/address", shopAddressRouter);
app.use("/v1/api/client/order", shopOrderRouter);
app.use("/v1/api/client/search", shopSearchRouter);
app.use("/v1/api/client/review", shopReviewRouter);

app.use("/v1/api/common/feature", commonFeatureRouter);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
