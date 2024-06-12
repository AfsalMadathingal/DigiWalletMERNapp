const  adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/error");
const jwt = require('jsonwebtoken');

const adminLogin = async (req,res,next)=>{

    try {
        var {id,password} = req.body;
        const admin = await adminModel.findOne({adminId:id})
        if (!admin) return next(errorHandler(404,"Admin not found"))
        const passwordCheck = bcrypt.compareSync(password, admin.password);
        if(!passwordCheck)return next(errorHandler(401,"wrong Credentials"))
        const token = jwt.sign({id:admin._id,role:"admin"},process.env.JWT_SECRET_KEY);
        var {password,...others} = admin._doc
        const expireDate = new Date(Date.now()+60*60*24*1000)

        res.cookie("admin_access_token",token,{httpOnly:true,expires:expireDate}).status(200).json({success:true,message:"login success",others})
        
    } catch (error) {
        
        next(error)

    }
}

module.exports ={
    adminLogin
}