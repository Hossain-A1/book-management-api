import { Schema, model } from "mongoose";
import { IBookStaticMethod, IBorrow } from "../interfaces/borrow.interface";
import BookModel from "./book.model";
import { IBook } from "../interfaces/book.interface";

const borrowSchema = new Schema<IBorrow, IBookStaticMethod>(
  {
    book: {
      type: Schema.Types.ObjectId,
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
  },
  { timestamps: true, versionKey: false }
);

borrowSchema.static(
  "isAvailableBookCopies",
  async function (bookId: string, bookCopies: number, quantity: number) {
    if (quantity > bookCopies) {
      throw new Error("No sufficient book available right now!");
    }

    let newCopies: number;
    if (quantity >= 1) {
      newCopies = bookCopies - quantity;
    } else {
      newCopies = bookCopies;
    }

    //Partial update only those fields I want, like copies and available
    const updateData: Partial<IBook> = { copies: newCopies };

    if (newCopies === 0) {
      updateData.available = false;
    }

    await BookModel.updateOne({ _id: bookId }, updateData);
  }
);

const BorrowModel = model<IBorrow, IBookStaticMethod>("Borrow", borrowSchema);
export default BorrowModel;
