/*const mongoose = require("mongoose");

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

module.exports = productModel;*/

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  language: String,
  category: String,
  plan: String,

  file: String,

  // uploaded mp4
  video: String,

  // youtube link
  youtubeLink: String,
});

module.exports = mongoose.model("movies", productSchema);