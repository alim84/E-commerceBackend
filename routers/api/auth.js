const express = require("express");
const {
  registrationController,
  loginController,
  OtpVerifyController,
} = require("../../controllers/authcontroller");
const { authMiddleware } = require("../../middleware/authMiddleware");
const router = express.Router();

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/opt-verify", OtpVerifyController);
router.get("/user", authMiddleware, (req, res) => {
  res.send("all User");
});

module.exports = router;
