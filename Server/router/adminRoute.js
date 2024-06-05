const express = require("express");
const adminModel = require("../models/adminModel");
const router = express.Router();
const verifyAdmin = require("../utils/veryfyAdmin");
const { getUsers, updateUser } = require("../controller/adminController");


router.get('/get-user',verifyAdmin,getUsers)
router.post('/edit-user',verifyAdmin, updateUser)


module.exports = router