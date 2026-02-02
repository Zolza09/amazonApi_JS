const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const router = express.Router();

const {
  createComments,
  updateComments,
  getComment,
  deleteComments,
} = require("../controller/comments");

// api/v1/comments
router
  .route("/")
  .post(protect, authorize("admin", "operator", "user"), createComments);

router
  .route("/:id")
  .get(getComment)
  .put(protect, authorize("admin", "operator", "user"), updateComments)
  .delete(protect, authorize("admin", "operator", "user"), deleteComments);

module.exports = router;
