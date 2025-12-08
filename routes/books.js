const express = require("express");

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controller/books");

const router = express.Router({ mergeParams: true });

router.route("/").get(getBooks).post(createBook);

router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

module.exports = router;
