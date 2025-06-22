"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        message: err.message || "Something went wrong",
        success: false,
        error: err,
    });
};
exports.default = errorHandler;
