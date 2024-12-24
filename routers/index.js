const express = require("express");
const router = express.Router();
const api=require('./api')


const baseurl=process.env.BASE_URL;
router.use(baseurl, api)


// router.get("/", (req, res)=>{
//     res.send("Get ready router")
// })

module.exports = router;
