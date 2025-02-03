const express= require("express");
const { cartController } = require("../../controllers/cartController");
const router=express.Router();

router.post("/addcart", cartController )


module.exports=router;