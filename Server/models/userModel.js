const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
    },
    password: { 
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    gender: {
        type: String
    }
});


module.exports = mongoose.model("User", userSchema);