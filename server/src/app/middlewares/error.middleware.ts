// middleware/errorHandler.ts
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    success: false,
    error:err
  });
  next()
};





export default errorHandler;
