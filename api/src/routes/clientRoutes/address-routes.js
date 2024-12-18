const express = require("express");
const {
  addAddress,
  getAllAddress,
  editAddress,
  deleteAddress,
} = require("../../controllers/clientController/address-controller");

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", getAllAddress);
router.put("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

module.exports = router;
