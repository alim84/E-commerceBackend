const express= require("express");
const { addproductController, deleteProductController, allProductController } = require("../../controllers/productController");
const router =express.Router();
const multer = require("multer");
const path= require("path");
const { authMiddleware } = require("../../middleware/authMiddleware");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const extention = file.originalname.split(".");

    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        `.${extention[extention.length - 1]}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

function errCheck(err, req, res, next) {
  if (err) {
    return res.status(500).send({ success: false, msg: err.message });
  }
  next();
}

router.post("/addproduct", authMiddleware, errCheck, upload.array("image"), addproductController)
router.delete("/deleteproduct/:id", authMiddleware,  deleteProductController)
router.get("/allproduct", allProductController)

module.exports=router