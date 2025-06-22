"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        message: err.message || "Something went wrong",
        success: false,
        error: err,
    });
    next();
};
exports.default = errorHandler;
