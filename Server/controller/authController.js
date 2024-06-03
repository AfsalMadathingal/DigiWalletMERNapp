const userModal = require("../models/userModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/error");

const signup = async (req, res, next) => {
    
  const { name, email, password } = req.body;

  console.log(req.body);

  try {

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModal({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json("User has been created");

  } catch (error) {

    next(error);
  }
};

module.exports = { signup };
