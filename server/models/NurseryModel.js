const mongoose = require("mongoose");
// const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  nurseryname: {
    type: String,
    required: true,
  },
  ownername: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    min: 10,
    max: 10,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  selectedCheckboxes: {
    type: [String],
    default: [],
  },
  location: {
    type: String,
  },

  delivery: {
    type: String,
    enum: ["Yes", "No"],
  },

  priceRange: {
    type: String,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("minorNursery", userSchema);
