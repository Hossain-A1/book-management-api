import React, { useState } from "react";
import { setIsBorrowModal } from "../../redux/features/books/bookSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useBorrowBookMutation } from "../../redux/api/borrowApi";
import toast from "react-hot-toast";
import { BorrowSchema } from "../../validation";
import { useNavigate } from "react-router";
import type { TBook } from "../../types/type";

type TBookProps = {
  book: Pick<TBook, "_id">;
};

const BorrowBook: React.FC<TBookProps> = ({ book }) => {
  const [borrowBook] = useBorrowBookMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [borrowData, setBorrowData] = useState({
    quantity: 1,
    dueDate: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBorrowData({ ...borrowData, [name]: value });
  };

  const handleBorrowBook = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const bookid = book._id;
    const data = {
      quantity: Number(borrowData.quantity),
      dueDate: borrowData.dueDate,
    };

    const result = BorrowSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field as string] = err.message;
      });
      setFieldErrors(fieldErrors);
      return;
    }

    try {
      const res = await borrowBook({ payload: result.data, bookid });

      if ("data" in res && res.data.success) {
        toast.success("Successfully borrowed this book");
        setBorrowData({ quantity: 1, dueDate: "" });
        setFieldErrors({});
        dispatch(setIsBorrowModal(false));
        navigate("/borrow-summary");
      }

      // Handle backend error
      else if ("data" in res && res.data.error?.errors) {
        const backendErrors = res.data.error.errors;
        const fieldErrors: Record<string, string> = {};
        Object.keys(backendErrors).forEach((key) => {
          fieldErrors[key] = backendErrors[key].message;
        });
        setFieldErrors(fieldErrors);
      } else {
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleBorrowBook}
      className='px-2 sm:px-8 flex flex-col items-center  gap-4 w-full h-full '
    >
      <button
        onClick={() => dispatch(setIsBorrowModal(false))}
        className='text-xl text-right w-full mx-auto  size-10 font-medium px-2 py-1  cursor-pointer rounded-full  text-red-700 '
      >
        <span>x</span>
      </button>
      <h2 className='flex items-center gap-1 justify-center text-xl font-semibold'>
        Borrow Book
        <span className='bg-gray-500 h-0.5 w-10 mt-1'></span>
      </h2>
      <div className='flex flex-col w-full '>
        <label className='text-md font-medium' htmlFor='quantity'>
          Qunatity*
        </label>
        <input
          onChange={handleOnChange}
          value={borrowData.quantity}
          name='quantity'
          className='px-4 py-2.5  rounded-lg border-2 border-gray-400 focus:border-gray-900 transition duration-300 outline-none text-sm font-medium '
          type='text'
          placeholder='Book quantity'
        />
        {fieldErrors.qunatity && (
          <p
            className={`${
              borrowData.quantity.toString().length > 0
                ? "hidden"
                : "text-sm text-red-500 mt-1"
            } `}
          >
            {fieldErrors.quantity}
          </p>
        )}
      </div>
      <div className='flex flex-col w-full'>
        <label className='text-md font-medium' htmlFor='dueDate'>
          DueDate*
        </label>
        <input
          onChange={handleOnChange}
          value={borrowData.dueDate}
          name='dueDate'
          className='px-4 py-2.5 rounded-lg border-2 border-gray-400 focus:border-gray-900 transition duration-300 outline-none text-sm font-medium '
          type='date'
          placeholder='dueDate'
        />
        {fieldErrors.dueDate && (
          <p
            className={`${
              borrowData.dueDate.toString().length > 0
                ? "hidden"
                : "text-sm text-red-500 mt-1"
            } `}
          >
            {fieldErrors.dueDate}
          </p>
        )}
      </div>
      <button
        type='submit'
        className='w-full mt-2 px-4 py-2.5 rounded-lg text-white  bg-blue-700 hover:bg-blue-600 transition duration-300  text-sm font-medium'
      >
        Borrow Now
      </button>
    </form>
  );
};

export default BorrowBook;
