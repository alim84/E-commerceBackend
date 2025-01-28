const categoryModel = require("../models/categoryModel");

async function CreateCategory(req, res) {
  let { name, description } = req.body;
  let category = new categoryModel({
    name,
    description,
    image: process.env.HOST_URL + req.file.filename,
  });
  await category.save();
  return res.status(201).send({ success: true, msg: "category is created" });
}

async function deleteCategory(req, res) {
  let { id } = req.params;
  try {
    let category = await categoryModel.findOneAndDelete({ _id: id });
    res.send(category);
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: `${error.message ? error.message : "Internal Server error"}`,
      error,
    });
  }
}

module.exports = { CreateCategory, deleteCategory };
