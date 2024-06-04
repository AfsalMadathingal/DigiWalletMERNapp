const userModal = require("../models/userModel");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/error");
var jwt = require('jsonwebtoken');
const userModel = require("../models/userModel");



const signup = async (req, res, next) => {
    
  const { name, email, password } = req.body;

  try {

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModal({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({success: true, message: "User created successfully"});

  } catch (error) {

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

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    var {password,...others} = user._doc

    res.cookie("token",token,{httpOnly:true}).status(200).json({success:true,message:"login success",others})
    
  } catch (error) {
    next(error);
  }

}


const googleSignIn = async (req, res, next) => {

  try {


      const {email,displayName,photoUrl}=req.body.result.user

      const user = await userModel.findOne({email})

      if (user) {

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);
        const expireDate = new Date(Date.now()+60*60*24*1000)
        res.cookie("token",token,{httpOnly:true,expires:expireDate}).status(200).json({success:true,message:"login success",user})

      } else {

        const randomPassword = Math.random().toString(36).substring(2,10)
        console.log(randomPassword);
        const hashedPassword = bcrypt.hashSync(randomPassword, 10);
        const newUser = new userModel({
          name:displayName,
          email,
          profilePic:photoUrl,
          password:hashedPassword,
        });

        await newUser.save();
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET_KEY);
        const expireDate = new Date(Date.now()+60*60*24*1000)
        res.cookie("token",token,{httpOnly:true,expires:expireDate}).status(200).json({success:true,message:"login success",user:newUser})
      }


  } catch (error) {

    console.log(error);
    next(errorHandler(error))
  }
}

module.exports = { signup , login ,googleSignIn};
