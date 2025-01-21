const nodemailer = require("nodemailer");
async function sendEmail(email) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.auth_email,
      pass: process.env.auth_pass,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.auth_email, 
    to: "email", 
    subject: "Please verify your email", 

    html: `<div><img src="https://i.ibb.co.com/Tq9HsT8/alim.png"><h2>Please verify your email</h2><h3>Your otp code is 2222</h3></div>`,
  });
}

module.exports = sendEmail;
