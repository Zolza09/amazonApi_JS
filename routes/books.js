const express = require("express");
const { protect }= require("../middleware/protect");

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadBookPhoto,
} = require("../controller/books");

const router = express.Router({ mergeParams: true });

router.route("/").get(getBooks).post(protect, createBook);

router.route("/:id").get(getBook).put(protect, updateBook).delete(protect, deleteBook);

router.route("/:id/photo").put(protect, uploadBookPhoto);
module.exports = router;
