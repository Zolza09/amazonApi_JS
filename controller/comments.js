const Comments = require("../models/sequelize/comments");
const MyError = require("../utils/myError");
//const asyncHandler = require("../middleware/asyncHandler");
const qs = require("qs");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate-sequelize");

exports.createComments = asyncHandler(async (req, res, next) => {
  const comments = await req.db.comments.create(req.body);

  res.status(200).json({
    success: true,
    data: comments,
  });
});

exports.getComments = asyncHandler(async (req, res, next) => {
  const parsed = qs.parse(req.query);
  let select = parsed.select;
  const sort = parsed.sort;

  if (select) {
    select = select.split(" ");
  }

  // no query page and limit default value
  const page = parseInt(parsed.page) || 1;
  const limit = parseInt(parsed.limit) || 5;

  // Iteration for delete values from parsed query obj
  ["page", "limit", "sort", "select"].forEach((el) => delete parsed[el]);

  console.log(req.db.comment);
  // Request dotoroo db nemchihsen bolhoor filter hiihdee req.db.comment geed shuune
  const pagination = await paginate(page, limit, req.db.comments);

  // Create own query object
  let query = { offset: pagination.start - 1, limit };
  //1. added default queries
  if (parsed) {
    query.where = parsed;
  }
  // 2. added select attributes
  if (select) {
    query.attributes = select;
  }

  if (sort) {
    query.order = sort
      .split(" ")
      .map((el) => [
        el.charAt(0) === "-" ? el.substring(1) : el,
        el.charAt(0) === "-" ? "DESC" : "ASC",
      ]);
  }
  // we can add query here
  const comments = await req.db.comments.findAll(query);

  // parsed - ooriinhoo jinhene query shalgaj bolno
  res.status(200).json({
    success: true,
    //myquery: query,
    data: comments,
    pagination,
  });
});

// /api/comments/:id
exports.updateComments = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comments.findByPk(req.params.id);
  if (!comment) {
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
  if (!comment) {
    throw new MyError(`${req.params.id} id-тай коммент олдсонгүй. `, 400);
  }

  // const [result] = await req.db.sequelize.query(
  //   "SELECT u.name, c.comments, c.createdAt FROM `user` u LEFT JOIN `comments` c ON u.id = c.userId WHERE c.comments LIKE '%гоё%';",
  // );

  // result model baidlaar avaad deer uildej hj bolno
  const result = await req.db.sequelize.query(
    " select * from comments where comments LIKE '%гоё%';",
    {
      model : req.db.comments,
    }
  );

  result[0].comments = "Ystoi goe nom shuu!";
  result[0].save();
  // const [uResult] = await req.db.sequelize.query(
  //   " UPDATE comments set comments = 'үнэхээр сонирхолтой ноооом...' where id = 5;",
  // );
  res.status(200).json({
    success: true,
    result,
    // comment bichsen user medeelel haruulj bna  await comment.getUser()
    // comment bichsen user-iin buh nom shuuj bna await(await comment.getUser()).getBooks()
    user: await comment.getUser(),
    book: await comment.getBook(),
    magic: Object.keys(req.db.comments.prototype),
    data: comment,
  });
});

exports.deleteComments = asyncHandler(async (req, res, next) => {
  let comment = await req.db.comments.findByPk(req.params.id);
  if (!comment) {
    throw new MyError(`${req.params.id} id-тай коммент олдсонгүй. `, 400);
  }

  comment = await comment.destroy();
  res.status(200).json({
    success: true,
    data: comment,
  });
});

// Lazy loading
exports.getUserComments = asyncHandler(async (req, res, next) => {
  const user = await req.db.user.findByPk(req.params.id);
  if (!user) {
    throw new MyError(`${req.params.id} id-тай user олдсонгүй. `, 400);
  }

  const comments = await user.getComments();

  res.status(200).json({
    success: true,
    user,
    comments: comments,
  });
});

// Eager loading
exports.getBookComments = asyncHandler(async (req, res, next) => {
  const book = await req.db.book.findByPk(req.params.id, {
    include: req.db.comments,
  });

  if (!book) {
    throw new MyError(`${req.params.id} id-тай book олдсонгүй. `, 400);
  }

  res.status(200).json({
    success: true,
    book,
  });
});
