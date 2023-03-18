const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// create product -- admin
router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);

// get all products
router
  .route("/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);

// get single product
router.route("/product/:id").get(singleProduct);

// update | delete product -- admin
router
  .route("/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
