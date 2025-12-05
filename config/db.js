const mongoose = require("mongoose");
const colors = require("colors");
const fs = require("fs");

const connectDB = async () => {
  
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);

};

module.exports = connectDB;