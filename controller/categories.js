const Category = require("../models/Category");
const MyError = require("../utils/myError");
//const asyncHandler = require("../middleware/asyncHandler");
const qs = require("qs");
const asyncHandler = require("express-async-handler");
// middleware style write
exports.getCategories = asyncHandler(async (req, res, next) => {
  const parsed = qs.parse(req.query);
  const select = parsed.select;
  const sort = parsed.sort;

  // no query page and limit default value
  const page = parseInt(parsed.page) || 1;
  const limit = parseInt(parsed.limit) || 20;

  // Iteration for delete values from parsed query obj
  ["page", "limit", "sort", "select"].forEach((el) => delete parsed[el]);

  console.log(page, limit);
  console.log(parsed, select, sort);

  // Pagination
  const total = await Category.countDocuments();
  const pageCount = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  let end = start + limit - 1;
  if (end > total) end = total;

  const pagination = { total, pageCount, start, end, limit };

  if (page < pageCount) pagination.nextPage = page + 1;
  if (page > 1) pagination.prevPage = page - 1;

  const categories = await Category.find(parsed, select)
    .sort(sort)
    .skip(start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    data: categories,
    pagination,
  });
});

exports.getCategory = asyncHandler(async (req, res, next) => {
  // add virtual field named books. populate books means fill books by all books information
  const category = await Category.findById(req.params.id).populate("books");

  if (!category) {
    throw new MyError(req.params.id + ` id doesn't exist `, 400);
  }
  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new MyError(req.params.id + " id doesn't exist ", 400);
  }

  res.status(200).json({
    success: true,
    data: category,
  });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw new MyError(req.params.id + `id doesn't exist`, 400);
  }
  res.status(200).json({
    success: true,
    data: category,
  });
});
