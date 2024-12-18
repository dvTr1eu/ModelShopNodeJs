const express = require("express");

const {
  handleImageUpload,
  addProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
} = require("../../controllers/admin/product-controller");

const { upload } = require("../../helpers/cloudinary");
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.get("/getAll", getAllProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;
