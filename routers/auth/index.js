const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("auth");
});

// router.get("/", (req, res)=>{
//     res.send("Get ready router")
// })

module.exports = router;
