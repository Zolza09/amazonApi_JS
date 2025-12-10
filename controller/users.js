const User = require("../models/User");
const MyError = require("../utils/myError");
const qs = require("qs");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res, next) => {
  
  res.status(200).json({
    success: true,
    data: req.body
  });
});