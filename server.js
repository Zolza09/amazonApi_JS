const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const rfs = require("rotating-file-stream");
const connectDB = require("./config/db");

const morgan = require("morgan");
const logger = require("./middleware/logger");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload");

//Import Router
const categoriesRoutes = require("./routes/categories");
const booksRoutes = require("./routes/books");
const usersRoutes = require("./routes/users");
const commentsRoutes = require("./routes/comments");
const injectDb = require("./middleware/injectDb");

dotenv.config({ path: "./config/config.env" });
const db = require("./config/db-mysql");

connectDB();

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: path.join(__dirname, "log"),
});

const app = express();
// body parser
app.use(express.json());
app.use(fileupload());
app.use(logger);
app.use(injectDb(db));
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/books", booksRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/comments", commentsRoutes);
app.use(errorHandler);

db.book.belongsToMany(db.user, {through: "comments"});
db.user.belongsToMany(db.book, {through: "comments"});
db.category.hasMany(db.book);
db.book.belongsTo(db.category);

db.sequelize
  // {force: true} in order create new tables use force
  .sync()
  .then((result) => {
    console.log("sync hiigdlee...");
  })
  .catch((err) => console.log(err));

const server = app.listen(
  process.env.PORT,
  console.log(`Express server ${process.env.PORT} port running...`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.underline.bold);
  server.close(() => {
    process.exit(1);
  });
});
