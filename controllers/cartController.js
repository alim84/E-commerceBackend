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

async function IncrementCartController(req, res) {
  const { id } = req.params;
  try {
    const cart = await cartModel.findOne({ _id: id });
    cart.quntity++;
    await cart.save();
    res.status(200).send({ msg: "Cart Successfull Upadate", data: cart });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: `${error.message ? error.message : "Internal Server error"}`,
      error,
    });
  }
}
async function decrementCartController(req, res) {
  const { id } = req.params;
  try {
    const cart = await cartModel.findOne({ _id: id });
    if (cart.quntity > 1) {
      cart.quntity--;
      await cart.save();
      res.status(200).send({ msg: "Cart Successfull Upadate", data: cart });
    } else {
      res.status(404).send({ msg: "your cart quntity is must be one" });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: `${error.message ? error.message : "Internal Server error"}`,
      error,
    });
  }
}
async function DeleteCartController(req, res) {
  const { id } = req.params;
  try {
    const deletecart = await cartModel.findOneAndDelete({ _id: id });
    res
      .status(200)
      .send({ msg: "Cart Product deleted successfully", data: deletecart });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: `${error.message ? error.message : "Internal Server error"}`,
      error,
    });
  }
}
module.exports = {
  cartController,
  getSingleUsercartController,
  IncrementCartController,
  decrementCartController,
  DeleteCartController,
};
