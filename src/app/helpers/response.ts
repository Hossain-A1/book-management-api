import { Response } from "express";


// Generic successResponse
const successResponse = <T>(
  res: Response,
  {
    statusCode = 200,
    success = true,
    message = "Success",
    data = null as T | null,  
  }: {
    statusCode: number;
    message: string;
    success?: boolean;
    data?: T | null;
  }
) => {
  return res.status(statusCode).json({
    message,
    success,
    data,
  });
};



const errorResponse = (
  res:Response,
  {
    success = false,
    statusCode = 500,
    message = "error",
  }: {
    statusCode: number;
    message: string;
    success?: boolean;
  }
) => {
  return res.status(statusCode).json({
    message,
    success,
  });
};


export { successResponse,errorResponse };
