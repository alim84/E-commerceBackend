const express = require("express");
const {
  cartController,
  getSingleUsercartController,
  IncrementCartController,
  decrementCartController,
  DeleteCartController,
} = require("../../controllers/cartController");
const router = express.Router();

router.post("/addcart", cartController);
router.get("/getcartbyuser/:id", getSingleUsercartController);
router.patch("/incrementcart/:id", IncrementCartController);
router.patch("/decrement/:id", decrementCartController);
router.patch("/deletecart/id", DeleteCartController);

module.exports = router;
