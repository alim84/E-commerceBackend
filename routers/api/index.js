const express = require("express");
const router = express.Router();
const auth = require("./auth");
const category = require("./category");
const product = require("./product");
const cart = require("./cart");

router.use("/auth", auth);
router.use("/category", category);
router.use("/product", product);
router.use("/cart", cart);

module.exports = router;
