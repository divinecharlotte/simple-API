const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../auth");
const {
  getAllUsers,
  registerUser,
  authUser,
} = require("../controllers/user.controller");

router.get("/", getAllUsers);

router.get("/google", authUser);
router.get("/register", registerUser);
// router.get("/auth/google",
//   passport.authenticate('google',{scope: ['email','profile']})
// )
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    const { user, token } = req.user;
    res.json({ user, token });
  }
);
router.get("/auth/failure", (req, res) => {
  res.send("something went wrong ....");
});
module.exports = router;
