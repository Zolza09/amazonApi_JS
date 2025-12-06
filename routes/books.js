const express = require("express");

const { getBooks } = require("../controller/books");

const router = express.Router({mergeParams : true});

router.route("/").get(getBooks);

// router
//   .route("/:id")
//   .get(getCategory)
//   .put(updateCategory)
//   .delete(deleteCategory);

module.exports = router;