import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";
import BorrowModel from "./borrow.model";

const bookSchema = new Schema<IBook>(
  {
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
        validator: function (v: number) {
          return Number.isInteger(v) && v >0;
        },
        message: (props) =>
          `${props.value} It must be a non-negative integer.`,
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);



//post hook delete all borrowed books after deleted a book
bookSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await BorrowModel.deleteMany({ book: doc._id });
  }
  next();
});

const BookModel = model<IBook>("Book", bookSchema);
export default BookModel;
