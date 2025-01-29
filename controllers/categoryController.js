const categoryModel = require("../models/categoryModel");
const fs = require("fs");
const path = require("path");


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
    let imagepath = category.image.split("/");
    let oldimagepath = imagepath[imagepath.length - 1];
    fs.unlink(
      `${path.join(__dirname, "../uploads")}/${oldimagepath}`,
      (err) => {
        if (err) {
          res.status(500).send({
            success: false,
            msg: `${err.message ? err.message : "Internal Server error"}`,
            err,
          });
        } else {
          res
            .status(200)
            .send({ success: true, msg: "image Deleted", data: category });
        }
      }
    );
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: `${error.message ? error.message : "Internal Server error"}`,
      error,
    });
  }
}

async function allcategory(req, res) {
  try {
    let allcategory = await categoryModel.find({});
    res
    .status(200)
    .send({ success: true, msg: "show all Category", data: allcategory });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: `${error.message ? error.message : "Internal Server error"}`,
      error,
    });
  }
  res.send("all category")
}

async function updatecategory(req, res) {
  res.send("update Category")
}

module.exports = { CreateCategory, deleteCategory, allcategory, updatecategory };
