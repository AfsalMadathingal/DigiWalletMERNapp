const userModal = require("../models/userModel");

const updateProfile = async (req, res, next) => {
  try {
    const { _id, name, email, profilePic, password, phone } = req.body;
    let query = { name, email, profilePic,phone };
    if (!_id) return next(errorHandler(404, "User not found"));
    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      query = { name, email, profilePic, password: hashedPassword };
      if (phone) {
        query = { name, email, profilePic, password: hashedPassword, phone };
      }
    }

    const user = await userModal.findByIdAndUpdate(_id, query, { new: true });
    console.log('====================================');
    console.log(user);
    console.log('====================================');
    if (user)
      return res
        .status(200)
        .json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateProfile };
