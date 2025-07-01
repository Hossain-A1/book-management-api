"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const response_1 = require("./response");
const isMongooseObjectId = (res, id) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return (0, response_1.errorResponse)(res, {
            statusCode: 400,
            message: "Invalid mongoose objectId",
        });
    }
    return;
};
exports.default = isMongooseObjectId;
