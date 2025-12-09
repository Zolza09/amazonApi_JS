const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categories");

const { getCategoryBooks } = require("../controller/books");
router.route("/:categoryId/books").get(getCategoryBooks);

// api/v1/caterories
router.route("/").get(getCategories).post(createCategory);

// 2. Second method:
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
