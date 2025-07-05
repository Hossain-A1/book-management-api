import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      errorMap: () => ({ message: "Please select a valid genre" }),
    }
  ),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(1, "ISBN is required"),
  copies: z
    .number({ invalid_type_error: "Copies must be an integer" })
    .int("Copies must be an integer")
    .positive("Copies must be a positive number"),
});

export const BorrowSchema = z.object({
  dueDate: z.string().nonempty("Due date is required"), 
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .int("Quantity must be an integer")
    .positive("Quantity must be a positive number"),
});
