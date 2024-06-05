const express = require("express");
const adminModel = require("../models/adminModel");
const router = express.Router();
const verifyAdmin = require("../utils/veryfyAdmin");
const { getUsers, updateUser, deleteUser } = require("../controller/adminController");


router.get('/get-user',verifyAdmin,getUsers)
router.post('/edit-user',verifyAdmin, updateUser)
router.post('/delete-user',verifyAdmin, deleteUser)


module.exports = router