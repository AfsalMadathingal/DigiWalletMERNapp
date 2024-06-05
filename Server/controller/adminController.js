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



module.exports = {getUsers}