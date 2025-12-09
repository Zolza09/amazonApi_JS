const express = require("express");

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadBookPhoto,
} = require("../controller/books");

const router = express.Router({ mergeParams: true });

router.route("/").get(getBooks).post(createBook);

router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

router.route("/:id/photo").put(uploadBookPhoto);
module.exports = router;
