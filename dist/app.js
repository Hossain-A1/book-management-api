"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const book_route_1 = __importDefault(require("./app/routes/book.route"));
const error_middleware_1 = __importDefault(require("./app/middlewares/error.middleware"));
const response_1 = require("./app/helpers/response");
const borrow_route_1 = __importDefault(require("./app/routes/borrow.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ credentials: true }));
app.get("/", (req, res) => {
    res.send("Wellcome to library-management App");
});
//bypass all router
app.use("/api/books", book_route_1.default);
app.use("/api/borrow", borrow_route_1.default);
// client error
app.use((req, res, next) => {
    next((0, response_1.errorResponse)(res, { statusCode: 404, message: "Route not found!" }));
});
//server error handler /global error
app.use(error_middleware_1.default);
exports.default = app;
