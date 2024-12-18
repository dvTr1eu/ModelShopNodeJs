const Product = require("../../models/Product");

const getFilteredProduct = async (req, res) => {
  try {
    const { size = [], category = [], sortBy = "price-lowtohigh" } = req.query;

    let filters = {};
    if (size.length) {
      filters.size = { $in: size.split(",") };
    }
    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      default:
        sort.price = 1;

        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get all products",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy sản phẩm",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get all products",
    });
  }
};

module.exports = { getFilteredProduct, getProductDetails };
