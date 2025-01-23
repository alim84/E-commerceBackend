const express = require("express");
const { CreateCategory } = require("../../controllers/categoryController");
const multer  = require('multer')

const router = express.Router();
const upload = multer({ dest: 'uploads/' })

router.post("/createcategory" , upload.single('profile'), CreateCategory)
module.exports = router;
