const express = require("express");

const {
  getFilteredProduct,
  getProductDetails,
} = require("../../controllers/clientController/product-controller");

const router = express.Router();

router.get("/get", getFilteredProduct);
router.get("/get/:id", getProductDetails);

module.exports = router;
