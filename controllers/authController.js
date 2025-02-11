const sendEmail = require("../helpers/sendEmail");
const EmailValidateCheck = require("../helpers/ValidateEmail");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const otp = require("otp-generator-simple");

async function registrationController(req, res) {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(404).send({ msg: "All feild is required" });
  }
  if (!EmailValidateCheck(email)) {
    return res.send({ error: "Invalid Email" });
  }
  let existinguser = await userModel.findOne({ email });
  if (existinguser) {
    return res.status(404).send({ error: " Email already is used" });
  }
  try {
    bcrypt.hash(password, 10, async function (err, hash) {
      let user = new userModel({
        name,
        email,
        password: hash,
      });
      await user.save();
      let otpsend = await userModel.findOneAndUpdate(
        { email },
        { $set: { otp: 1234 } },
        { new: true }
      );
      setTimeout(async () => {
        let otpsend = await userModel.findOneAndUpdate(
          { email },
          { $set: { otp: null } },
          { new: true }
        );
      }, 5000);
      sendEmail(email);
      res.send(user);
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}
async function loginController(req, res) {
  let { email, password } = req.body;
  let existinguser = await userModel.findOne({ email });
  if (existinguser) {
    bcrypt.compare(
      password,
      existinguser.password,
      async function (err, result) {
        if (result) {
          if (existinguser.role == "user") {
            let userInfo = {
              id: existinguser._id,
              name: existinguser.name,
              email: existinguser.email,
              role: existinguser.role,
            };
            const token = jwt.sign({ userInfo }, process.env.jwt_secret, {
              expiresIn: "30d",
            });
            res.cookie("token", token, {
              // httpOnly: true,
              secure: false,
            });

            return res
              .status(200)
              .send({ sucess: "User Login Success", data: userInfo, token });
          } else if (existinguser.role == "admin") {
            let userInfo = {
              id: existinguser._id,
              name: existinguser.name,
              email: existinguser.email,
              role: existinguser.role,
            };
            const token = jwt.sign({ userInfo }, process.env.jwt_secret, {
              expiresIn: "30d",
            });
            res.cookie("token", token, {
              // httpOnly: true,
              secure: false,
            });
            return res
              .status(200)
              .send({ sucess: "Admin Login Success", data: userInfo, token });
          }
        } else {
          return res.status(404).send({ error: "Invalid Password" });
        }
      }
    );
  } else {
    return res.send({ error: "Credential Email" });
  }
}

async function OtpVerifyController(req, res) {
  const { email, otp } = req.body;
  const existinguser = await userModel.findOne({ email });
  if (existinguser) {
    if (existinguser.otp == otp) {
      existinguser.isVerify = true;
      await existinguser.save();
      return res.status(200).send({ success: true, msg: "OTP Verify" });
    } else {
      return res.status(404).send({ success: false, msg: "Invalid OTP" });
    }
  } else {
    return res.status(404).send({ success: false, msg: "User nnot found" });
  }
}
async function ResendOtpController(req, res) {
  const { email } = req.body;
  const existinguser = await userModel.findOne({ email });

  if (existinguser) {
    let resend_otp = otp();
    existinguser.otp = resend_otp;
    await existinguser.save();

    setTimeout(async () => {
      existinguser.otp = null;
      await existinguser.save();
    }, 10000);

    sendEmail(email, resend_otp);

    return res.status(200).send({ success: true, msg: "OTP resned" });
  } else {
    return res.status(404).send({ success: false, msg: "user not found" });
  }
}
module.exports = {
  registrationController,
  loginController,
  OtpVerifyController,
  ResendOtpController,
};
