const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { signup } = require("../controller/authController");





router.post("/signup", signup)




module.exports = router