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
exports.handleDeleteBook = exports.handleUpdateBook = exports.handleGetsBooks = exports.handleGetBook = exports.handleCreateBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const response_1 = require("../helpers/response");
const error_middleware_1 = __importDefault(require("../middlewares/error.middleware"));
const idChecker_1 = __importDefault(require("../helpers/idChecker"));
const zod_1 = require("zod");
const createBookZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.string(),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number(),
    available: zod_1.z.boolean().optional(),
});
//-------create a book--------------//
const handleCreateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, isbn, description, copies, available } = yield createBookZodSchema.parse(req.body);
        const book = yield book_model_1.default.create({
            title,
            author,
            genre,
            isbn,
            description,
            copies,
            available,
        });
        (0, response_1.successResponse)(res, {
            statusCode: 201,
            message: "Book created successfully!",
            data: book,
        });
    }
    catch (error) {
        (0, error_middleware_1.default)(error, req, res, next);
    }
});
exports.handleCreateBook = handleCreateBook;
//----------get a book------------//
const handleGetBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        (0, idChecker_1.default)(res, bookId);
        const book = yield book_model_1.default.findById(bookId);
        if (!book) {
            (0, response_1.errorResponse)(res, {
                statusCode: 404,
                message: "Book not found",
            });
            return;
        }
        (0, response_1.successResponse)(res, {
            statusCode: 200,
            message: "Book retrieved  successfully!",
            data: book,
        });
    }
    catch (error) {
        (0, error_middleware_1.default)(error, req, res, next);
    }
});
exports.handleGetBook = handleGetBook;
//-----delete  a book-----------//
const handleDeleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        yield (0, idChecker_1.default)(res, bookId);
        const book = yield book_model_1.default.findOneAndDelete({ _id: bookId });
        if (!book) {
            (0, response_1.errorResponse)(res, {
                statusCode: 404,
                message: "Deleted book not found",
            });
            return;
        }
        (0, response_1.successResponse)(res, {
            statusCode: 200,
            success: true,
            message: "Book deleted successfully!",
        });
    }
    catch (error) {
        (0, error_middleware_1.default)(error, req, res, next);
    }
});
exports.handleDeleteBook = handleDeleteBook;
//---------update a book ----------//
const handleUpdateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { copies } = req.body;
        const { bookId } = req.params;
        (0, idChecker_1.default)(res, bookId);
        const book = yield book_model_1.default.findByIdAndUpdate(bookId, { copies, available: true }, { new: true });
        if (!book) {
            (0, response_1.errorResponse)(res, {
                statusCode: 404,
                message: "Updated book not found",
            });
            return;
        }
        (0, response_1.successResponse)(res, {
            statusCode: 200,
            success: true,
            message: "Book update successfully!",
            data: book,
        });
    }
    catch (error) {
        (0, error_middleware_1.default)(error, req, res, next);
    }
});
exports.handleUpdateBook = handleUpdateBook;
//--------gets all books --------------//
const handleGetsBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterQuery = req.query.filter || "";
        const limit = parseInt(req.query.limit) || 5;
        const sort = req.query.sort || "desc";
        const sortBy = req.query.sortBy || "createdAt";
        const filterRegEx = new RegExp(filterQuery, "i");
        const filter = {
            genre: { $regex: filterRegEx },
        };
        const books = yield book_model_1.default.find(filter)
            .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
            .limit(limit);
        (0, response_1.successResponse)(res, {
            statusCode: 200,
            success: true,
            message: "Books retrieved  successfully!",
            data: books,
        });
    }
    catch (error) {
        (0, error_middleware_1.default)(error, req, res, next);
    }
});
exports.handleGetsBooks = handleGetsBooks;
