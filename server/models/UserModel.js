const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
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
  pincode: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  selectedCheckboxes: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("minorUser", userSchema);
