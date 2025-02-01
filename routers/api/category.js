const express = require("express");
const {
  CreateCategory,
  deleteCategory,
  allcategory,
  updatecategory,
  singleCategory,
} = require("../../controllers/categoryController");
const multer = require("multer");
const { authMiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();
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
router.post(
  "/createcategory",
  authMiddleware,
  upload.single("image"),
  errCheck,
  CreateCategory
);
router.delete("/deletecategory/:id", authMiddleware, deleteCategory);
router.get("/allcategory",  allcategory);
router.patch("/updatecategory/:id", authMiddleware, upload.single("image"), updatecategory);
router.get ("/singlecategory/:id", singleCategory)
module.exports = router;
