// middleware/errorHandler.ts
import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  const statusCode = err.statusCode || 400;

  res.status(statusCode).json({
    message: err.message || "Something went wrong",
    success: false,
    error: err,
  });
};





export default errorHandler;
