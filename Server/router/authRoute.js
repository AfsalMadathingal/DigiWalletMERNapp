const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { signup, login, googleSignIn, logout , verifyUser} = require("../controller/authController");


router.post("/signup", signup);
router.post("/login", login);
router.post('/google',googleSignIn)
router.get('/logout',logout)
router.get('/verifyuser',verifyUser)

module.exports = router;
