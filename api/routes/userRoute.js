const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

// register user
router.route("/register").post(registerUser);

// login user
router.route("/login").post(loginUser);

// logout user
router.route("/logout").get(logoutUser);

module.exports = router;
