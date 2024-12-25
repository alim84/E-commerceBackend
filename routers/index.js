const express = require("express");
const router = express.Router();
const api = require("./api");

const baseurl = process.env.BASE_URL;
router.use(baseurl, api);

router.use(baseurl, (req, res) => {
  res.status(404).send({ error: "No api found on this route" });
});

// router.get("/", (req, res)=>{
//     res.send("Get ready router")
// })

module.exports = router;
