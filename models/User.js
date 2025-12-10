const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Хэрэглэгчийн нэрийг оруулна уу']
    },
    email: {
        type: String,
        required: [true, 'Хэрэглэгчийн имэйл хаягийг оруулж өгнө үү'],
        unique: true,
        match : [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Имэйл хаяг буруу байна.",
        ],
    },
    role: {
        type: String,
        required : [true, "Хэрэглэгчийн эрхийг оруулна уу"],
        enum: ["user", "admin"],
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
    }
});

module.exports = mongoose.model("User", UserSchema);