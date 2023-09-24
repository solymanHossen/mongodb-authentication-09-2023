const express=require('express')
const {getUsers,createUser, loginUser,currentUser}=require("../controllers/usersControllers");
const validateToken = require('../middleware/validateTokenHandler');
const router=express.Router();


router.route('/register').get(getUsers);
router.route('/register').post(createUser);
router.route('/login').post(loginUser);
router.route('/current').get(validateToken,currentUser);

module.exports = router