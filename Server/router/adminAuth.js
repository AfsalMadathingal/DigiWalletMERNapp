const express = require("express");
const router = express.Router();
const {adminLogin} = require('../controller/adminAuthController')




router.post('/login',adminLogin)


module.exports = router