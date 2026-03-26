const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  language: String,
  category: String,
  file: String,
  video: String,
  plan:String
});

const productModel = mongoose.model("movies", movieSchema);

module.exports = productModel;