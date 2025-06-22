import mongoose from "mongoose";
import { errorResponse } from "./response";
import { Response } from "express";


const isMongooseObjectId =(res:Response, id:string)=>{
 if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Invalid mongoose objectId",
      });
    }
    return
}

export default isMongooseObjectId