const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Номын нэр оруулна уу"],
      unique: true,
      trim: true,
      maxLength: [250, "Нэр хамгийн уртдаа 250 тэмдэгт байна"],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    author: {
      type: String,
      required: [true, "Зохиогчын нэр оруулна уу"],
      trim: true,
      maxLength: [50, "Зохиогчын нэр хамгийн уртдаа 50 тэмдэгт байна"],
    },
    rating: {
      type: Number,
      min: [1, "Сэтгэгдэл хамгийн багадаа 1 байна"],
      max: [10, "Сэтгэгдэл хамгийн ихдээ 10 байна"],
    },
    price: {
      type: Number,
      required: [true, "Номны үнэ заавал оруулна уу"],
      min: [1, "Номны үнэ хамгийн багадаа 500 төгрөг байна"],
    },
    balance: Number,
    content: {
      type: String,
      required: [true, "Номны тайлбарыг оруулна уу"],
      maxLength: [5000, "Тайлбар хамгийн ихдээ 5000 тэмдэгт байна"],
    },
    bestseller: {
      type: Boolean,
      default: false,
    },
    available: [String],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


BookSchema.statics.computeCategoryAveragePrice = async function (catId) {
  const obj = await this.aggregate([
    { $match: {category: catId}},
    { $group: {_id : "$category", avgPrice: {$avg: "$price"}}},
  ]);

  console.log(obj);

  let avgPrice = null;
  if(obj.length > 0) avgPrice = obj[0].avgPrice;

  await this.model('Category').findByIdAndUpdate(catId, {
    averagePrice: avgPrice,
  });

  return obj;
}

BookSchema.post('save', function(){
  this.constructor.computeCategoryAveragePrice(this.category);
});

BookSchema.post('deleteOne', { document: true, query: false }, function(){
  console.log("Bookschema remove function is called ....");
  this.constructor.computeCategoryAveragePrice(this.category);
});

// add new virtual field it doesn't exist in real db
BookSchema.virtual("zohiogch").get(function(){
  return "Zoloo";
});
module.exports = mongoose.model("Book", BookSchema);
