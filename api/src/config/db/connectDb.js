const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://dvtrieu03:lienhong0906@cluster0.0k6nk.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect succeeded");
  } catch (e) {
    console.log("Connect failed: " + e.message);
  }
}

module.exports = { connect };
