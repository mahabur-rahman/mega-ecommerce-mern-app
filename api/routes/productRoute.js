const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// create product -- admin
router.route("/admin/product/new").post(createProduct);

// get all products
router.route("/products").get(getAllProducts);

// get single product
router.route("/product/:id").get(singleProduct);

// update | delete product -- admin
router.route('/product/:id').put(updateProduct).delete(deleteProduct)

module.exports = router;
