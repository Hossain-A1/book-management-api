import express, { Application, Request, Response } from "express";
import cors from "cors";
import book_router from "./app/routes/book.route";
import errorHandler from "./app/middlewares/error.middleware";
import { errorResponse } from "./app/helpers/response";
import borrow_router from "./app/routes/borrow.route";

const app: Application = express();
app.use(express.json());
app.use(cors({ credentials: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Wellcome to library-management App");
});

//bypass all router
app.use("/api/books", book_router);
app.use("/api/borrow", borrow_router);

// client error
app.use((req, res, next) => {
  next(errorResponse(res, { statusCode: 404, message: "Route not found!" }));
});

//server error handler /global error
app.use(errorHandler);

export default app;
