const User = require("../models/User");
const MyError = require("../utils/myError");
const qs = require("qs");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

exports.register = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  const token = user.getJWT();
  res.status(200).json({
    success: true,
    token: token,
    data: user.name,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new MyError("Имэйл болон нууц үгээ оруулна уу", 400);
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new MyError("Имэйл болон нууц буруу байна 1", 401);
  }
  const result = await user.checkPassword(password);
  if (!result) {
    throw new MyError("Имэйл болон нууц буруу байна 2", 401);
  }

  res.status(200).json({
    success: true,
    token: user.getJWT(),
    role: user.role,
    user: user
  });
});

exports.getUsers = asyncHandler(async (req, res, next) => {
  const parsed = qs.parse(req.query);
  const select = parsed.select;
  const sort = parsed.sort;

  // no query page and limit default value
  const page = parseInt(parsed.page) || 1;
  const limit = parseInt(parsed.limit) || 5;

  // Iteration for delete values from parsed query obj
  ["page", "limit", "sort", "select"].forEach((el) => delete parsed[el]);

  // Pagination
  const pagination = await paginate(page, limit, User);

  const users = await User.find(parsed, select)
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
    pagination,
  });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  // add virtual field named books. populate books means fill books by all books information
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new MyError(req.params.id + ` id User doesn't exist `, 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new MyError(req.params.id + " id User doesn't exist ", 400);
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new MyError(req.params.id + `id User doesn't exist`, 400);
  }

  //This remove is call our Category model remove function
  await user.deleteOne();

  res.status(200).json({
    success: true,
    data: user,
  });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // add virtual field named books. populate books means fill books by all books information
  if (!req.body.email) {
    throw new MyError("Та нууц үг сэргээх эмайл хаягаа дамжуулна уу", 400);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new MyError(req.body.email + ` имэлтэй хэрэглэгч олдсонгүй! `, 400);
  }

  const resetToken = user.generatePasswordChangeToken();
  await user.save();
  // await user.save({runValidators: false});
  const link = `https://amazon.mn/changepassword/${resetToken}`;

  const message = `Сайн байна уу <br><br>Та нууц үгээ солих хүсэлт илгээлээ.<br> Нууц үгээ доорхи линк дээр дарж солино уу: <br><br><a href="${link}">${link}</a> <br><br> Өдрийг сайхан өнгөрүүлээрэй!`;

  // send email to user resetToken
  const info = await sendEmail({
    email: user.email,
    subject: "Нууц үг өөрчлөх хүсэлт",
  });

  console.log("Message sent:", info.messageId);

  res.status(200).json({
    success: true,
    resetToken
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  // add virtual field named books. populate books means fill books by all books information
  if (!req.body.resetToken || !req.body.password) {
    throw new MyError("Та нууц үг болон рэсэт токен дамжуулна уу", 400);
  }

  const encrypted = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: encrypted,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new MyError(`Хүчингүй токен байна! `, 400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    token: user.getJWT(),
    user,
  });
});
