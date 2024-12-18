const express = require("express");
const {
  addToCart,
  getCartItem,
  updateCartItem,
  deleteCart,
} = require("../../controllers/clientController/cart-controller");

const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", getCartItem);
router.put("/update-cart", updateCartItem);
router.delete("/:userId/:productId", deleteCart);

module.exports = router;
