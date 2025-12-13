const express = require("express");
const {protect, authorize} = require("../middleware/protect");
const {
  register,
  login,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../controller/users");

const router = express.Router();

// api/v1/users
router.route("/").post(createUser).get(getUsers);
router.route("/login").post(login);
router.route("/register").post(register)
// 2. Second method:
router
  .route("/:id")
  .get(getUser)
  .put(protect, authorize("admin", "operator"), updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
