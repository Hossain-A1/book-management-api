import { Model, Types } from "mongoose";

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}


export interface IBookStaticMethod extends Model<IBorrow> {
  isAvailableBookCopies(bookId: string, copies: number, quantity: number): Promise<void>;
}