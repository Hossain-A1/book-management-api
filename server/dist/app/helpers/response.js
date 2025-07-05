"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
// Generic successResponse
const successResponse = (res, { statusCode = 200, success = true, message = "Success", data = null, pagination, }) => {
    return res.status(statusCode).json({
        message,
        success,
        data,
        pagination,
    });
};
exports.successResponse = successResponse;
const errorResponse = (res, { success = false, statusCode = 500, message = "error", }) => {
    return res.status(statusCode).json({
        message,
        success,
    });
};
exports.errorResponse = errorResponse;
