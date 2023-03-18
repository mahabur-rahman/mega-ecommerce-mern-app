const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const UserModel = require("../models/UserModel");
const sendToken = require("../utils/jwtToken");
const catchAsyncError = require("../middleware/catchAsyncError");

// register user
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "profile public id",
      url: "demo url",
    },
  });

  // const token = user.getJWTToken();

  // res.status(201).json({
  //   success: true,
  //  user,
  //   token,
  // });

  // invoke func
  sendToken(user, 201, res);
});

// login user
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email
  if (!email || !password) {
    return next(new ErrorHandler("please enter email & password!", 400));
  }

  // find user
  const user = await UserModel.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password0", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // const token = user.getJWTToken();

  // res.status(200).json({
  //   success: true,
  //  user,
  //   token,
  // });

  // invoke func
  sendToken(user, 200, res);
});

// logout user
const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "LOGOUT SUCCESSFUL",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
