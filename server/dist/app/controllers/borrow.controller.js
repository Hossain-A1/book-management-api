"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBorrowedBooksSummary = exports.handleBorrowBook = void 0;
const response_1 = require("../helpers/response");
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const book_model_1 = __importDefault(require("../models/book.model"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const idChecker_1 = __importDefault(require("../helpers/idChecker"));
//borrow a book
const handleBorrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookid } = req.params;
        (0, idChecker_1.default)(res, bookid);
        const { quantity, dueDate } = req.body;
        const booked = yield book_model_1.default.findById(bookid);
        if (!booked) {
            (0, response_1.errorResponse)(res, {
                statusCode: 404,
                message: "Book not found",
            });
        }
        const copies = booked === null || booked === void 0 ? void 0 : booked.copies;
        //static methot is here
        yield borrow_model_1.default.isAvailableBookCopies(bookid, copies, quantity);
        const borrowBookData = {
            bookid,
            quantity,
            dueDate,
        };
        const borrowed = yield borrow_model_1.default.create(borrowBookData);
        (0, response_1.successResponse)(res, {
            statusCode: 201,
            message: "Book borrowed successfully",
            data: borrowed,
        });
    }
    catch (error) {
        (0, error_middleware_1.default)(error, req, res, next);
    }
});
exports.handleBorrowBook = handleBorrowBook;
const handleBorrowedBooksSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrowedBooks = yield borrow_model_1.default.aggregate([
            {
                $group: {
                    _id: "$bookid",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id", //book _id
                    foreignField: "_id", //borrow _id
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                },
            },
        ]);
        (0, response_1.successResponse)(res, {
            statusCode: 200,
            message: "Borrowed books summary retrieved successfully.",
            data: borrowedBooks,
        });
    }
    catch (error) {
        (0, error_middleware_1.default)(error, req, res, next);
    }
});
exports.handleBorrowedBooksSummary = handleBorrowedBooksSummary;
