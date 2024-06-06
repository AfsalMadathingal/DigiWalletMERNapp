const express = require("express");
const router = express.Router();
const { getUsers, updateUser, deleteUser , createUser} = require("../controller/adminController");


router.get('/get-user',getUsers)
router.post('/edit-user', updateUser)
router.post('/create-user', createUser)
router.post('/delete-user', deleteUser)


module.exports = router