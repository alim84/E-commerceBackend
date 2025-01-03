const EmailValidateCheck = require("../helpers/ValidateEmail");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  
    bcrypt.compare(password, existinguser.password, async function (err, result) {
      if (result) {
        let info = await userModel.findOne({ email }).select("-password");
        const token = jwt.sign({ info }, process.env.jwt_secret, {
          expiresIn: "1d",
        });
    
        return res
          .status(200)
          .send({ sucess: "Login Success", data: existinguser, token });
      } else {
        return res.status(404).send({ error: "Invalid Password" });
      }
    });
  } else {
    return res.send({ error: "Credential Email" });
  }
}

module.exports = { registrationController, loginController };
