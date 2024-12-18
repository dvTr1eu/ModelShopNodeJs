const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    productname: String,
    description: String,
    category: String,
    size: String,
    price: Number,
    salePrice: Number,
    quantity: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
