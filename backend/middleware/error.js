const ErrorHandler = require("../utils/errorhandler");


module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "INtrnal Server Error";

    //MongoDB Error -- Product Id Error (if product id is small than original id )
    if (err.name === 'CastError') {
        const message = `Resource not found. Ivalid:${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    //MOngoose Duplicate Error
    if (err.code === 11000) {
        const message = `Duplciate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }

    //Wrong JWT error
    if (err.code === "JsonWebTokenError") {
        const message = `Josn Web Token is invalid, Try again`;
        err = new ErrorHandler(message, 400)
    }

    //JWT EXPIRE ERROR
    if (err.code === "TokenExpireError") {
        const message = `Josn Web Token is Expired, Try again`;
        err = new ErrorHandler(message, 400)
    }


    res.status(err.statusCode).json({
        success: false,
        message: err.message, // show message = product not found
        // error: err, //err.stack == gives address where the error 404
    });
};
