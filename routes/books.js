const express = require("express");
const { authorize, protect } = require("../middleware/protect");

const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  uploadBookPhoto,
} = require("../controller/books");

const {getBookComments} = require("../controller/comments");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getBooks)
  .post(protect, authorize("admin", "operator"), createBook);

router
  .route("/:id")
  .get(getBook)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

router.route("/:id/photo").put(protect, uploadBookPhoto);
router.route("/:id/comments").get(getBookComments);
module.exports = router;
