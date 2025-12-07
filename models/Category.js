const mongoose = require("mongoose");
const { transliteration, slugify } = require("transliteration");
const { deleteMany } = require("./Book");

const CategorySchema = new mongoose.Schema(
  {
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
  },
  // this will help to create virtual object
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// connection of book
CategorySchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

// This remove is called from controller .deleteCategory function
// removing all books of desired category
CategorySchema.pre("deleteOne", {document : true, query : false}, async function () {
  console.log("removing ... ");
  await this.model("Book").deleteMany({ category: this._id });
  
});

CategorySchema.pre("save", function (next) {
  // convert utf-8 to ASCII
  this.slug = slugify(this.name);
  this.averageRating = Math.floor(Math.random() * 10) + 1;
  this.averagePrice = Math.floor(Math.random() * 100000) + 3000;  
});

module.exports = mongoose.model("Category", CategorySchema);
