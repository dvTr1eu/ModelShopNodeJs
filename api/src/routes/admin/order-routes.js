const express = require("express");

const {
  getAllOrdersUser,
  getOrderDetailsAdmin,
  updateOrderStatus,
} = require("../../controllers/admin/order-controller");

const router = express.Router();

router.get("/getAll", getAllOrdersUser);
router.get("/details/:id", getOrderDetailsAdmin);
router.put("/update/:id", updateOrderStatus);

module.exports = router;
