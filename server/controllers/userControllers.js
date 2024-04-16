const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports.signup = async (req, res, next) => {
    try {
        const { fullname, email, password, phone, address, state, city, location, pincode, selectedCheckboxes } = req.body;
        const emailCheck = await User.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            fullname,
            password: hashedPassword,
            phone,
            address,
            state,
            city,
            location,
            pincode,
            selectedCheckboxes
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user)
            return res.json({ msg: "Incorrect email or password", status: false });
        const isPassword = await bcrypt.compare(password, user.password)
        if(!isPassword)
            return res.json({ msg: "Incorrect email or password", status: false });
        delete user.password;
        return res.json({ status: true, user });
    } catch (error) {
        next(error);
    }
};
