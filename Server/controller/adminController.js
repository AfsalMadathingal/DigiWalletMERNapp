const userModal = require("../models/userModel");


const getUsers = async (req, res, next) => {   
    try {
        
        const users = await userModal.find();
        console.log('====================================');
        console.log(users);
        console.log('====================================');
        res.status(200).json({success: true, users});

    } catch (error) {

        next(error);
        
    }
}

const updateUser= async (req, res, next) => {
    try {

        const {_id}= req.body;
        const user = await userModal.findByIdAndUpdate(_id,req.body,{new:true});
        res.status(200).json({success: true, user});
        
    } catch (error) {
        next(error)
    }
}


module.exports = {getUsers ,updateUser}