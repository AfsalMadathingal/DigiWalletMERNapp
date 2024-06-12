const userModal = require("../models/userModel");

const updateProfile = async (req, res, next) => {
  try {

    console.log('====================================');
    console.log(req.body);
    console.log('====================================');
    
    var { _id, name, email, profilePic, password, phone ,url } = req.body;
    
    if (!url) url = profilePic;
    let query = { name, email, profilePic:url,phone };
    if (!_id) return next(errorHandler(404, "User not found"));
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      query = { name, email, profilePic:url, password: hashedPassword };
      if (phone) {
        query = { name, email, profilePic:url, password: hashedPassword, phone };
      }
    }

    const user = await userModal.findByIdAndUpdate(_id, query, { new: true });


    var { password, ...others } = user._doc;
    if (user)
      return res
        .status(200)
        .json({ success: true, message: "User updated successfully", user:others });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { updateProfile };
