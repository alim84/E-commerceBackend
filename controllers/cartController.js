const cartModel = require("../models/cartModel");

async function cartController(req, res) {
  let { price, quntity, products, user } = req.body;
  try {
    let cart = new cartModel({
      price,
      quntity,
      products,
      user,
    });
    await cart.save();
    return res.status(201).send({
      success: true,
      msg: "Product add to Cart successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: `${error.message ? error.message : "Internal Server error"}`,
      error,
    });
  }
}
async function getSingleUsercartController(req, res) {
  let { id } = req.params;
  try {
    let cart = await cartModel.find({ user: id });

    res.status(201).send({
      success: true,
      msg: "Product add featch successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: `${error.message ? error.message : "Internal Server error"}`,
      error,
    });
  }
}
module.exports = { cartController, getSingleUsercartController };
