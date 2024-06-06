const express = require("express");
const router = express.Router();
const userModal = require("../models/userModel");
const {updateProfile} = require("../controller/userController");


router.post("/updateProfile", updateProfile);



module.exports = router