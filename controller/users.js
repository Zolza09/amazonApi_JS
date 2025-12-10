const User = require("../models/User");
const MyError = require("../utils/myError");
const qs = require("qs");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res, next) => {
  
  const user = await User.create(req.body);

  const jwt = user.getJWT();
  res.status(200).json({
    success: true,
    jwt: jwt,
    data: user,

  });
});