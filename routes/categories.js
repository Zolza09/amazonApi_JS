const express = require("express");
const {protect} = require("../middleware/protect");

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
router.route("/").get(getCategories).post(protect, createCategory);

// 2. Second method:
router
  .route("/:id")
  .get(getCategory)
  .put(protect, updateCategory)
  .delete(protect, deleteCategory);

module.exports = router;
