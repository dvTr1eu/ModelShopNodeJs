const express = require("express");

const {
  searchProduct,
} = require("../../controllers/clientController/search-controller");

const router = express.Router();

router.get("/:key", searchProduct);

module.exports = router;
