import { NextFunction, Request, Response } from "express";
import BookModel from "../models/book.model";
import { errorResponse, successResponse } from "../helpers/response";
import errorHandler from "../middlewares/error.middleware";
import isMongooseObjectId from "../helpers/idChecker";
import { z } from "zod";
import { IBook } from "../interfaces/book.interface";
import { TApiResponse } from "../interfaces/api.interface";

const createBookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number(),
  available: z.boolean().optional(),
});

//-------create a book--------------//
const handleCreateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, author, genre, isbn, description, copies, available } =
      await createBookZodSchema.parse(req.body);

    const book = await BookModel.create({
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      available,
    });

    successResponse<IBook>(res, {
      statusCode: 201,
      message: "Book created successfully!",
      data: book,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
//----------get a book------------//
const handleGetBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { bookId } = req.params;

    isMongooseObjectId(res, bookId);

    const book = await BookModel.findById(bookId);

    if (!book) {
      errorResponse(res, {
        statusCode: 404,
        message: "Book not found",
      });
      return;
    }

    successResponse<IBook>(res, {
      statusCode: 200,
      message: "Book retrieved  successfully!",
      data: book,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
//-----delete  a book-----------//
const handleDeleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    await isMongooseObjectId(res, id);

    const book = await BookModel.findOneAndDelete({ _id: id });

    if (!book) {
      errorResponse(res, {
        statusCode: 404,
        message: "Deleted book not found",
      });
      return;
    }

    successResponse(res, {
      statusCode: 200,
      success: true,
      message: "Book deleted successfully!",
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
//---------update a book ----------//
const handleUpdateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {     title,
      author,
      genre,
      isbn,
      description,
      copies,
      available, } = req.body;
    if (copies < 1) {
      errorResponse(res, {
        statusCode: 400,
        message: "Please provide a positive copies number",
      });
      return;
    }
    const { id } = req.params;
    isMongooseObjectId(res, id);

    const book = await BookModel.findByIdAndUpdate(
      id,
      {     title,
      author,
      genre,
      isbn,
      description,
      copies,
      available, },
      { new: true }
    );
    if (!book) {
      errorResponse(res, {
        statusCode: 404,
        message: "Updated book not found",
      });
      return;
    }
    successResponse<IBook>(res, {
      statusCode: 200,
      success: true,
      message: "Book update successfully!",
      data: book,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};
//--------gets all books --------------//
const handleGetsBooks = async (
  req: Request,
  res: Response<TApiResponse<IBook[]>>,
  next: NextFunction
): Promise<void> => {
  try {
    const filterQuery = (req.query.filter as string) || "";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const sort = (req.query.sort as string) || "desc";
    const sortBy = (req.query.sortBy as string) || "createdAt";

    const filterRegEx = new RegExp(filterQuery, "i");

    const filter = {
      genre: { $regex: filterRegEx },
    };

    const skip = (page - 1) * limit;

    const countProducts = await BookModel.countDocuments(filter);

    const books = await BookModel.find(filter)
      .sort({ [sortBy]: sort === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    successResponse<IBook[]>(res, {
      statusCode: 200,
      success: true,
      message: "Books retrieved successfully!",
      data: books,
      pagination: {
        totalpage: Math.ceil(countProducts / limit),
        currentPage: page,
        prevPage: page - 1 > 0 ? page - 1 : null,
        nextPage:
          page + 1 <= Math.ceil(countProducts / limit) ? page + 1 : null,
        totalNumberOfProducts: countProducts,
      },
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
};


export {
  handleCreateBook,
  handleGetBook,
  handleGetsBooks,
  handleUpdateBook,
  handleDeleteBook,
};
