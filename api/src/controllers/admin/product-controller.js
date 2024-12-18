const express = require("express");
const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Lỗi",
    });
  }
};

//thêm mới sản phẩm
const addProduct = async (req, res) => {
  try {
    const {
      image,
      productname,
      description,
      category,
      size,
      price,
      salePrice,
      quantity,
    } = req.body;

    const newProduct = new Product({
      image,
      productname,
      description,
      category,
      size,
      price,
      salePrice,
      quantity,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi",
    });
  }
};
//hiển thị tất cả sản phẩm
const getAllProduct = async (req, res) => {
  try {
    const listProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi",
    });
  }
};
//cập nhật sản phẩm
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      productname,
      description,
      category,
      size,
      price,
      salePrice,
      quantity,
    } = req.body;
    let updateProduct = await Product.findById(id);
    if (!updateProduct)
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });

    (updateProduct.productname = productname || updateProduct.productname),
      (updateProduct.description = description || updateProduct.description),
      (updateProduct.category = category || updateProduct.category),
      (updateProduct.size = size || updateProduct.size),
      (updateProduct.price = price === "" ? 0 : price || updateProduct.price),
      (updateProduct.salePrice =
        salePrice === "" ? 0 : salePrice || updateProduct.salePrice),
      (updateProduct.quantity = quantity || updateProduct.quantity),
      (updateProduct.image = image || updateProduct.image),
      await updateProduct.save();
    res.status(200).json({
      success: true,
      data: updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi",
    });
  }
};
//xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct)
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });

    res.status(200).json({
      success: true,
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Lỗi",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
};
