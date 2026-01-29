const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const router = express.Router();

const { createComments } = require("../controller/comments");

// api/v1/comments
router
  .route("/")
  .post(protect, authorize("admin", "operator", "user"), createComments);

// 2. Second method:
// router
//   .route("/:id")
//   .get(getCategory)
//   .put(protect, authorize("admin", "operator"),  updateCategory)
//   .delete(protect, authorize("admin"), deleteCategory);

module.exports = router;
