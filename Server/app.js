const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})


app.listen(3000, () => console.log("Server running on port 3000"));
