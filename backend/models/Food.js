const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  image: String,
  category: String,
  price: {
    type: Number,
    required: true
  },
  restaurant: String,
  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Food', FoodSchema);
