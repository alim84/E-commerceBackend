const productModel = require("../models/productModel");

async function addproductController(req, res) {
  let { name, desctription, sellingprice, discountprice, categroy, stock } =
    req.body;

  let images = req.files.map(
    (item) => `${process.env.HOST_URL}/${item.filename}`
  );

  try {
    const product = new productModel({
      name,
      desctription,
      sellingprice,
      discountprice,
      categroy,
      stock,
      image: images,
    });
    await product.save();
    res.status(200).send({
      success: true,
      msg: "product created successfully",
      data: product,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, msg: error.message || error });
  }
}
module.exports = { addproductController };
