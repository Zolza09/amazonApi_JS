const express = require("express");
const { protect, authorize } = require("../middleware/protect");
const {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  forgotPassword,
  resetPassword,
} = require("../controller/users");

const { getUserBook } = require("../controller/books");
const { getUserComments } = require("../controller/comments");

const router = express.Router();
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

router.use(protect);
// api/v1/users
router
  .route("/")
  .post(authorize("admin"), createUser)
  .get(authorize("admin", "operator"), getUsers);

// 2. Second method:
router
  .route("/:id")
  .get(authorize("admin", "operator", "user"), getUser)
  .put(authorize("admin", "operator"), updateUser)
  .delete(authorize("admin"), deleteUser);

router
  .route("/:id/books")
  .get(authorize("admin", "operator", "user"), getUserBook);

router
.route("/:id/comments")
.get(getUserComments);
module.exports = router;
