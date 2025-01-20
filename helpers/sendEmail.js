const nodemailer = require("nodemailer");
async function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.auth_email,
      pass: process.env.auth_pass,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.auth_email, // sender address
    to: "alimmefwd@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
}

module.exports = sendEmail;
