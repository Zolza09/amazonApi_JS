const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг оруулна уу"],
  },
  email: {
    type: String,
    required: [true, "Хэрэглэгчийн имэйл хаягийг оруулж өгнө үү"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Имэйл хаяг буруу байна.",
    ],
  },
  role: {
    type: String,
    required: [true, "Хэрэглэгчийн эрхийг оруулна уу"],
    enum: ["user", "operator", "admin"],
    default: "user",
  },
  password: {
    type: String,
    minlength: 4,
    required: [true, "Нууц үгээ оруулна уу"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function () {

  //Herew password uurchlugduugu bval shuud daraa middleware yvna
  if(!this.isModified("password")) return;

  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getJWT = function () {
  //generate JWT token
  const token = jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIREIN,
    }
  );

  return token;
};

UserSchema.methods.checkPassword = async function (inPassword) {
  return await bcrypt.compare(inPassword, this.password);
};

UserSchema.methods.generatePasswordChangeToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  return resetToken;
};


UserSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "category",
  justOne: false,
});

module.exports = mongoose.model("User", UserSchema);
