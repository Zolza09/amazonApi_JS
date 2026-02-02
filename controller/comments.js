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

// exports.getComments = asyncHandler(async (req, res, next) => {
//   const comments = await req.db.comments.find(req.body);
  
//   res.status(200).json({
//     success: true,
//     data: comments,
//   });
// });

// /api/comments/:id
exports.updateComments = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comments.findByPk(req.params.id);
  if(!comment) {
    throw new MyError(`${req.params.id} id-тай коммент олдсонгүй. `, 400);
  }
  comment = await comment.update(req.body);
  res.status(200).json({
    success: true,
    data: comment,
  });
});


exports.getComment = asyncHandler(async (req, res, next) => {
  const comment = await req.db.comments.findByPk(req.params.id);
  if(!comment) {
    throw new MyError(`${req.params.id} id-тай коммент олдсонгүй. `, 400);
  }
  res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.deleteComments = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comments.findByPk(req.params.id);
  if(!comment) {
    throw new MyError(`${req.params.id} id-тай коммент олдсонгүй. `, 400);
  }

  comment = await comment.destroy();
  res.status(200).json({
    success: true,
    data: comment,
  });
});