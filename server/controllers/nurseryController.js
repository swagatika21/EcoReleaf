const User = require("../models/NurseryModel");
const bcrypt = require("bcrypt");
let hashedPassword;
module.exports.nsignup = async (req, res, next) => {
  try {
    const {
      nurseryname,
      role,
      ownername,
      email,
      password,
      phone,
      address,
      state,
      city,
      selectedCheckboxes,
      location,
      delivery,
      priceRange,
      pincodeNursery,
      profNursery
    } = req.body;

    console.log(req.body)

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
      try {
       hashedPassword = await bcrypt.hash(password, 10);
      } catch (error) {
        console.error("Error hashing password:", error);
      }    const user = await User.create({
      email,
      nurseryname,
      role,
      ownername,
      password: hashedPassword,
      phone,
      address,
      state,
      city,
      selectedCheckboxes,
      location,
      delivery,
      priceRange,
      pincodeNursery,
      profNursery
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.nlogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.json({ msg: "Incorrect email or password", status: false });
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      return res.json({ msg: "Incorrect email or password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllNursery = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

module.exports.getNurseryById = async (req, res, next) => {
  try {
    const { nurseryId } = req.params;
    const nursery = await User.findById(nurseryId);
    if (!nursery) {
      return res.status(404).json({ msg: "Nursery not found", status: false });
    }
    res.json(nursery);
  } catch (error) {
    next(error);
  }
};

