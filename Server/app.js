const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const userRoute =  require('./router/userRoute')
const adminRoute = require ('./router/adminRoute')
const authRoute = require('./router/authRoute')
const adminAuth = require('./router/adminAuth');
const verifyUser = require('./utils/verifyUser');
const verifyAdmin = require('./utils/veryfyAdmin');

app.use(cookieParser());
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

app.use('/api/auth/admin-auth',adminAuth);
app.use('/api/auth',authRoute);
app.use('/api/user',verifyUser,userRoute);
app.use('/api/admin',verifyAdmin,adminRoute);


app.use((err, req, res, next) => {

    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage
    });
});



app.listen(3000, () => console.log("Server running on port 3000"));
