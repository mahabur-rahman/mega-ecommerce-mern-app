const UserModel = require("../models/UserModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserModel.findById(decodedData.id);
  next();
});

// authorize admin
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // access only admin if this func (authorizeRoles) call
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} in not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
