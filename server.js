const express = require('express');
const dotenv = require('dotenv');
const path = require("path"); 
const rfs = require("rotating-file-stream");
const connectDB = require("./config/db");

const morgan = require("morgan");
const logger = require('./middleware/logger');
const colors = require("colors");
const errorHandler = require('./middleware/error');

dotenv.config({path: './config/config.env'});

connectDB();

//Import Router
const categoriesRoutes = require("./routes/categories");
const booksRoutes = require("./routes/books");
var accessLogStream = rfs.createStream("access.log", {
    interval: "1d",
    path : path.join(__dirname, "log")
});

const app = express();
// body parser
app.use(express.json());
app.use(logger);
app.use(morgan('combined', {stream : accessLogStream}));
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/books', booksRoutes);
app.use(errorHandler);


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