const Book = require("../models/Book");
const Category = require("../models/Category");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const qs = require("qs");
const path = require("path");

// api/v1/books
exports.getBooks = asyncHandler(async (req, res, next) => {
  console.log("All books");

  const books = await Book.find().populate({
    path: "category",
    select: "name averagePrice",
  });

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

// api/v1/categories/:catId/books
exports.getCategoryBooks = asyncHandler(async (req, res, next) => {
  const books = await Book.find({ category: req.params.categoryId });;

  res.status(200).json({
    success: true,
    count: books.length,
    data: books,
  });
});

exports.getBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id).populate();
  if (!book) {
    throw new MyError(req.params.id + "ID-тай ном байхгүй байна.", 404);
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

exports.createBook = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    throw new MyError(
      req.body.category + ` ID-тай категори байхгүй байна`,
      400
    );
  }

  const book = await Book.create(req.body);
  res.status(200).json({
    success: true,
    data: book,
  });
});

exports.updateBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) {
    throw new MyError(req.params.id + "D-тай ном байхгүй байна.", 404);
  }

  res.status(200).json({
    success: true,
    data: book,
  });
});

exports.deleteBook = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + "D-тай ном байхгүй байна.", 404);
  }

  await book.deleteOne();
  res.status(200).json({
    success: true,
    data: book,
  });
});

//PUT api/v1/books/:id/photo
exports.uploadBookPhoto = asyncHandler(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    throw new MyError(req.params.id + "D-тай ном байхгүй байна.", 404);
  }
  // image file upload
  console.log(req.files);
  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new MyError("Та зурагны хэмжээ 100KB бага байх ёстой.", 400);
  }

  //change photo name book id + file extension.
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError("Файлыг хуулах явцад алдаа гарлаа:" + err.message, 400);
    }

    book.photo = file.name;
    book.save();

    res.status(200).json({
      sucess: true,
      data: file.name,
    });
  });
});
