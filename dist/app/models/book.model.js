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
const mongoose_1 = require("mongoose");
const borrow_model_1 = __importDefault(require("./borrow.model"));
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Book title is required"],
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
        trim: true,
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        enum: {
            values: [
                "FICTION",
                "NON_FICTION",
                "SCIENCE",
                "HISTORY",
                "BIOGRAPHY",
                "FANTASY",
            ],
            message: 'Genre "{VALUE}" is not valid',
        },
    },
    isbn: {
        type: String,
        required: [true, "ISBN number is required"],
        unique: [true, "ISBN alredy exist, try another ISBN number"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    copies: {
        type: Number,
        required: [true, "Copies number is required!"],
        validate: {
            validator: function (v) {
                return Number.isInteger(v) && v > 0;
            },
            message: (props) => `${props.value} It must be a non-negative integer.`,
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true, versionKey: false });
//post hook delete all borrowed books after deleted a book
bookSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield borrow_model_1.default.deleteMany({ book: doc._id });
        }
        next();
    });
});
const BookModel = (0, mongoose_1.model)("Book", bookSchema);
exports.default = BookModel;
