const express = require("express");
const { CreateCategory } = require("../../controllers/categoryController");
const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const extention = file.originalname.split(".");

    cb(null, file.fieldname + "-" + uniqueSuffix + `.${extention[1]}`);
  },
});
const upload = multer({ storage: storage });

router.post("/createcategory", upload.single("profile"), CreateCategory);
module.exports = router;
