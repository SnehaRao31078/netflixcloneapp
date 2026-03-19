const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoLink: String
});

const bannerModel = mongoose.model("banner", bannerSchema);

module.exports = bannerModel;