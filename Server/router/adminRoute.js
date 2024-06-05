const express = require("express");
const adminModel = require("../models/adminModel");
const router = express.Router();
const verifyAdmin = require("../utils/veryfyAdmin");
const { getUsers } = require("../controller/adminController");


router.get('/get-user',verifyAdmin,getUsers)


module.exports = router