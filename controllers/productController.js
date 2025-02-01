const productModel = require("../models/productModel");
const fs = require("fs");
const path = require("path");

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
async function deleteProductController(req, res) {
  let { id } = req.params;
  try {
    let deleteproduct = await productModel.findOneAndDelete({ _id: id });
    let imagepatharray = deleteproduct.image;
    imagepatharray.forEach((item) => {
      let imagepath = item.split("/");
      let oldimagepath = imagepath[imagepath.length - 1];
      fs.unlink(
        `${path.join(__dirname, "../uploads")}/${oldimagepath}`,
        (err) => {
          if (err) {
            return res.status(500).send({
              success: false,
              msg: `${err.message ? err.message : "Internal Server error"}`,
              err,
            });
          }
        }
      );
    });

    return res.status(200).send({
      success: true,
      msg: "Product image Deleted",
      data: deleteproduct,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, msg: error.message || error });
  }
}
async function allProductController(req, res) {
  try {
    let allproduct = await productModel.find({});
    res.status(200).send({
      success: true,
      msg: "all product find successfully",
      data: allproduct,
    });
    return;
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, msg: error.message || error });
  }
}
module.exports = {
  addproductController,
  deleteProductController,
  allProductController,
};
