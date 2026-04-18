const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  email: String,
  plan: String,
  price: Number,       
  basePrice: Number,   // original price
  gstAmount: Number,   // GST (18%)
  country: String,
  paymentId: String
});

module.exports = mongoose.model("subscribe", planSchema);