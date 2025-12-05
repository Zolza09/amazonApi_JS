
const logger = (req, res, next) => {
    req.userId = "qwer123";
    console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`);
    next();
};

// file gargahiin tuld zaaval class export hiih heregtei
module.exports = logger;