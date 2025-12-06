const express = require("express");
const router = express.Router();

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categories");


/* 1. First method to connect book route in caterogy
 * Import books controller then connect getBooks function
*/
//const {getBooks} = require("../controller/books");
//router.route("/:categoryId/books").get(getBooks);

/*
 2. Second method import bookRouter 
 Ном роутер оруулж ирнэ тэгээд ямар хаягнаас орж ирхэд Ном унших ёстойг зааж өгнө.
 Зааж өгч байгаа роутер нь заавал {mergeParams : true} болгосон байх ёстойг анхаарах

*/
const booksRouter = require("./books");
router.use("/:categoryId/books", booksRouter);
// api/v1/caterories
router.route("/").get(getCategories).post(createCategory);



// 2. Second method: 
router
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
