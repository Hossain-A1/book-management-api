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
const book_model_1 = __importDefault(require("./book.model"));
const borrowSchema = new mongoose_1.Schema({
    bookid: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book _id is required"],
    },
    quantity: {
        type: Number,
        validate: {
            validator: function (v) {
                return Number.isInteger(v) && v >= 1;
            },
            message: (props) => `${props.value} is not a positive quantity!`,
        },
        required: [true, "Quantity is required"],
    },
    dueDate: {
        type: Date,
        required: [true, "due Date is required"],
    },
}, { timestamps: true, versionKey: false });
borrowSchema.static("isAvailableBookCopies", function (bookId, bookCopies, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (quantity > bookCopies) {
            throw new Error("No sufficient book available right now!");
        }
        let newCopies;
        if (quantity >= 1) {
            newCopies = bookCopies - quantity;
        }
        else {
            newCopies = bookCopies;
        }
        //Partial update only those fields I want, like copies and available
        const updateData = { copies: newCopies };
        if (newCopies === 0) {
            updateData.available = false;
        }
        yield book_model_1.default.updateOne({ _id: bookId }, updateData);
    });
});
const BorrowModel = (0, mongoose_1.model)("Borrow", borrowSchema);
exports.default = BorrowModel;
