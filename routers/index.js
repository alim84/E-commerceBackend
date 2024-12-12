const express = require("express");
const router = express.Router();
const auth =require("./auth")

const baseurl=process.env.BASE_URL;
router.use(baseurl, auth)


// router.get("/", (req, res)=>{
//     res.send("Get ready router")
// })

module.exports = router;
