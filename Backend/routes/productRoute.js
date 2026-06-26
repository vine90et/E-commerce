const express = require("express");
const {protect} = require("../middleware/auth.middleware.js");
const {admin} = require("../middleware/admin.middleware.js")
const {getProduct, getProductbyId, createProduct, deleteProduct, updateProduct} = require("../controller/productController.js")
const multer = require("multer");
const upload = multer({dest: 'uploads/'})

const router = express.Router();


router.route("/").get(getProduct).post(protect, admin, upload.single('image'), createProduct);
router.route("/:id").get(getProductbyId).put(protect, admin, upload.single('image'), updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;