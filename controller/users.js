const User = require("../models/User");
const MyError = require("../utils/myError");
const qs = require("qs");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.getJWT();
  res.status(200).json({
    success: true,
    token: token,
    data: user.name,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new MyError("Имэйл болон нууц үгээ оруулна уу", 400);
  }

  const user = await User.findOne({ email }).select("+password");
    
  if (!user) {
    throw new MyError("Имэйл болон нууц буруу байна 1", 401);
  }
  const result = user.checkPassword(password);
  if(!result) {
    throw new MyError("Имэйл болон нууц буруу байна 2", 401);
  }

  res.status(200).json({
    success: true,
    token: user.getJWT(),
    role: user.role
  });
});
