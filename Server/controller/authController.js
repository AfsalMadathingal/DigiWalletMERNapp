const userModal = require("../models/userModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/error");
var jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");



const signup = async (req, res, next) => {
    
  var { name, email, password } = req.body;

  try {

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModal({ name, email, password: hashedPassword });
    await newUser.save();
    var {password,...others} = newUser._doc

    res.cookie("token",jwt.sign({id:newUser._id,role:"user"},process.env.JWT_SECRET_KEY),{httpOnly:true}).status(200).json({success: true, message: "User created successfully",user:others});
   

  } catch (error) {
    

    next(error);
  }
};

const verifyUser = async (req, res, next) => {

  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModal.findById(decoded.id);
    if(!user) return next(errorHandler(404,"User not found"))
    
    res.status(200).json({ success: true, user });  

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    next(error);
  }
};

const login = async (req, res, next) => {

  try {

    var {email,password} = req.body;

    const user = await userModal.findOne({email})

    if (!user) return next(errorHandler(404,"User not found"))

    const passwordCheck = bcrypt.compareSync(password, user.password);

    if(!passwordCheck)return next(errorHandler(401,"wrong Credentials"))

    const token = jwt.sign({id:user._id,role:"user"},process.env.JWT_SECRET_KEY);

    var {password,...others} = user._doc


    res.cookie("token",token,{httpOnly:true}).status(200).json({success:true,message:"login success",user:others})
    
  } catch (error) {
    next(error);
  }

}


const googleSignIn = async (req, res, next) => {

  try {


      const {email,displayName,photoURL}=req.body.result.user



      const user = await userModel.findOne({email})

      if (user) {

        const token = jwt.sign({id:user._id,role:"user"},process.env.JWT_SECRET_KEY);
        const expireDate = new Date(Date.now()+60*60*24*1000)
        const {password,...userData} = user._doc
        res.cookie("token",token,{httpOnly:true,expires:expireDate}).status(200).json({success:true,message:"login success",user:userData})

      } else {

        const randomPassword = Math.random().toString(36).substring(2,10)
        console.log(randomPassword);
        const hashedPassword = bcrypt.hashSync(randomPassword, 10);
        const newUser = new userModel({
          name:displayName,
          email,
          profilePic:photoURL,
          password:hashedPassword,
        });

        await newUser.save();
        const token = jwt.sign({id:newUser._id,role:"user"},process.env.JWT_SECRET_KEY);
        const expireDate = new Date(Date.now()+60*60*24*1000)
        const{password,...userData} = newUser._doc
        res.cookie("token",token,{httpOnly:true,expires:expireDate}).status(200).json({success:true,message:"login success",user:userData})
      }


  } catch (error) {

    console.log(error);
    next(errorHandler(error))
  }
}


const logout = async (req, res, next) => {
  try {
    
    res.cookie("token",null,{httpOnly:true ,expires:new Date(Date.now())}).status(200).json({success:true,message:"logout success"})


  } catch (error) {
    
  }
}

module.exports = { signup , login ,googleSignIn,logout, verifyUser};
