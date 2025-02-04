const express = require("express");
const {
  cartController,
  getSingleUsercartController,
} = require("../../controllers/cartController");
const router = express.Router();

router.post("/addcart", cartController);
router.get("/getcartbyuser/:id", getSingleUsercartController);

module.exports = router;
