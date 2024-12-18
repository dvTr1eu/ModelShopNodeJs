const express = require("express");

const {
  addProductReview,
  getProductReview,
} = require("../../controllers/clientController/product-review-controller");

const router = express.Router();

router.post("/add", addProductReview);
router.get("/:productId", getProductReview);

module.exports = router;