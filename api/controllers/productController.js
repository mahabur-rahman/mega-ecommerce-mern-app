const ProductModel = require("../models/ProductModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/apiFeature");

// create product -- admin
const createProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.create(req.body);

  const savedProduct = await product.save();

  return res.status(201).json({
    success: true,
    savedProduct,
  });
});

// get all products
const getAllProducts = catchAsyncError(async (req, res, next) => {
  // http://localhost:5000/api/v1/products?keyword=laptop&category=laptop&price[gte]=3500&price[lt]=4000&page=2
  const resultPerPage = 8;

  const apiFeature = new ApiFeature(ProductModel.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;

  return res.status(200).json({
    success: true,
    products,
  });
});

// get single product
const singleProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  return res.status(200).json({
    success: true,
    product,
  });
});

// update product --admin
const updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  return res.status(200).json({
    success: true,
    updatedProduct,
  });
});

// delete product --admin
const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await ProductModel.findByIdAndDelete(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Product has been deleted",
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
};
