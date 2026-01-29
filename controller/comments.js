const Comments = require("../models/sequelize/comments");
const MyError = require("../utils/myError");
//const asyncHandler = require("../middleware/asyncHandler");
const qs = require("qs");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");

exports.createComments = asyncHandler(async (req, res, next) => {
  const comments = await req.db.comments.create(req.body);
  
  res.status(200).json({
    success: true,
    data: comments,
  });
});