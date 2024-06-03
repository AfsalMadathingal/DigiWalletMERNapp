const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    AdminId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

});


module.exports = mongoose.model("Admin", userSchema)