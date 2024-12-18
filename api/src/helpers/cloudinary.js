const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dblgdqkqo",
  api_key: "586632876713348",
  api_secret: "ZgzfPc0lGEhuLPGhH30Oi9uHWPc",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
}

const upload = multer({ storage });
module.exports = { upload, imageUploadUtil };
