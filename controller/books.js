const Book = require("../models/Book");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const qs = require("qs");

// api/v1/books
// api/v1/categories/:catId/books
exports.getBooks = asyncHandler(async (req, res, next) => {
  let query;
  
  if (req.params.categoryId) {
    console.log("Category query catId: " + req.params.categoryId);
    query = Book.find({ category: req.params.categoryId });
  } else {
    console.log("All books");
    // If we want to get whole info of category call .populate('category') 
    query = Book.find().populate({
      path : "category",
      select: "name averagePrice"
    });
  }

  const books = await query;

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});
