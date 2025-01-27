const express = require("express");
const {
  registrationController,
  loginController,
  OtpVerifyController,
  ResendOtpController,
} = require("../../controllers/authcontroller");
const { authMiddleware } = require("../../middleware/authMiddleware");
const router = express.Router();

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/otp-verify", OtpVerifyController);
router.post("/resend-otp", ResendOtpController);
router.get("/user", authMiddleware, (req, res) => {
  res.send("all User");
});

module.exports = router;
