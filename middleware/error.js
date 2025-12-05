const errorHandler = (err, req, res, next) => {
    console.log(err.stack.red);

    console.log(err);

     if (err.code === 11000) {
        err.message = "Адилхан нэр өгч болохгүй!";
        err.statusCode = 400;
    }

    if (err.name === "CastError") {
        err.message = "Энэ ID буруу бүтэцтэй ID байна!";
        err.statusCode = 400;
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message
    });
};

module.exports = errorHandler;