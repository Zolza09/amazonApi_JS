const mongoose = require("mongoose");
const { transliteration, slugify } = require("transliteration");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Нэр заавал байх ёстой"],
    unique: true,
    trim: true,
    maxLength: [50, "Нэр хамгийн уртдаа 50 тэмдэгт байна"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Тайлбар заавал байх ёстой"],
    maxLength: [500, "Тайлбар 500 тэмдэгтээс их байж болохгүй"],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  averageRating: {
    type: Number,
    min: [1, "Сэтгэгдэл хамгийн багадаа 1 байна"],
    max: [10, "Сэтгэгдэл хамгийн ихдээ 10 байна"],
  },
  averagePrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CategorySchema.pre("save", function (next) {
  // convert utf-8 to ASCII
  this.slug = slugify(this.name);
  this.averageRating = Math.floor(Math.random() * 10) + 1;
  this.averagePrice = Math.floor(Math.random() * 100000) + 3000;
  // next();
});

module.exports = mongoose.model("Category", CategorySchema);
