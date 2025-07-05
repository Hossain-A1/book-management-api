import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../helpers/response";
import errorHandler from "../middlewares/error.middleware";
import BookModel from "../models/book.model";
import BorrowModel from "../models/borrow.model";
import { IBorrow } from "../interfaces/borrow.interface";
import isMongooseObjectId from "../helpers/idChecker";
//borrow a book
const handleBorrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { bookid } = req.params;
    isMongooseObjectId(res, bookid);
    const { quantity, dueDate } = req.body;

    const booked = await BookModel.findById(bookid);

    if (!booked) {
      errorResponse(res, {
        statusCode: 404,
        message: "Book not found",
      });
    }

    const copies = booked?.copies;
    //static methot is here
    await BorrowModel.isAvailableBookCopies(bookid, copies as number, quantity);

    const borrowBookData = {
      bookid,
      quantity,
      dueDate,
    };

    const borrowed = await BorrowModel.create(borrowBookData);

    successResponse<IBorrow>(res, {
      statusCode: 201,
      message: "Book borrowed successfully",
      data: borrowed,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

const handleBorrowedBooksSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const borrowedBooks = await BorrowModel.aggregate([
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
    successResponse(res, {
      statusCode: 200,
      message: "Borrowed books summary retrieved successfully.",
      data: borrowedBooks,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};

export { handleBorrowBook, handleBorrowedBooksSummary };
