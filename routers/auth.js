const express = require("express");
const {
  postRegisterUser,
  postLoginUser,
  logOutUser,
  isLoggedIn,
  emailSend,
  changePassword,
  validateOtp,
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", postRegisterUser);
router.post("/login", postLoginUser);
router.get("/logout", logOutUser);
router.get("/is_logged_in", isLoggedIn);
router.post("/email_send", emailSend);
router.post("/validate_otp", validateOtp);
router.post("/change_password", changePassword);

module.exports = router;
