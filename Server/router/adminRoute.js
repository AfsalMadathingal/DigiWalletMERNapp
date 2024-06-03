const express = require("express");
const adminModel = require("../models/adminModel");
const router = express.Router();



router.get("/", (req, res) => {
    res.json({
        message: "Hello admin"});

})


module.exports = router