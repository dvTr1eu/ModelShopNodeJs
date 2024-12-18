const Product = require("../../models/Product");

const searchProduct = async (req, res) => {
  try {
    const { key } = req.params;
    if (!key || typeof key !== "string") {
      return res.status(404).json({
        success: false,
        message: "Chưa nhập từ khóa tìm kiếm",
      });
    }
    const regEx = new RegExp(key, "i");

    const createSearchQuery = {
      $or: [
        { productname: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);
    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { searchProduct };
