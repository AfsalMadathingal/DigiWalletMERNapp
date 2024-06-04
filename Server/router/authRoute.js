const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { signup, login, googleSignIn } = require("../controller/authController");


router.post("/signup", signup);
router.post("/login", login);
router.post('/google',googleSignIn)

module.exports = router;
