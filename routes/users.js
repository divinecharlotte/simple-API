const express = require("express");
const router = express.Router();
const passport = require('passport')
require('../auth')
const { getAllUsers, registerUser , authUser} = require("../controllers/user.controller");



router.get("/", getAllUsers);
router.get("/google", authUser);
router.get("/register", registerUser);
router.get("/auth/google",
  passport.authenticate('google',{scope: ['email','profile']})
)
module.exports = router;
