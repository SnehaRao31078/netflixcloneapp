const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  email: String,
  plan: String,
  price: Number,       
  basePrice: Number,   
  gstAmount: Number,   
  country: String,
  paymentId: String
});

module.exports = mongoose.model("subscribe", planSchema);