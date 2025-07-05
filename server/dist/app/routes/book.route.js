"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const book_router = express_1.default.Router();
//book router
book_router.post("/", book_controller_1.handleCreateBook);
book_router.put("/edit-book/:id", book_controller_1.handleUpdateBook);
book_router.delete("/:id", book_controller_1.handleDeleteBook);
book_router.get("/:bookId", book_controller_1.handleGetBook);
book_router.get("/", book_controller_1.handleGetsBooks);
exports.default = book_router;
