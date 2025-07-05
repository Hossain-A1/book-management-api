"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("../controllers/borrow.controller");
const borrow_router = express_1.default.Router();
borrow_router.post('/:bookid', borrow_controller_1.handleBorrowBook);
borrow_router.get('/', borrow_controller_1.handleBorrowedBooksSummary);
exports.default = borrow_router;
