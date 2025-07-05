import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { TBook } from "../../types/type";
import {
  useAddBookMutation,
  useUpdateBookMutation,
} from "../../redux/api/bookApi";
import {
  selectedBooks,
  setIsEditModal,
  setIsOpenModal,
} from "../../redux/features/books/bookSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { BookSchema } from "../../validation";
import { useNavigate } from "react-router";

type TBookDataProps = {
  bookData: Partial<TBook>;
};

const AddBook: React.FC<TBookDataProps> = ({ bookData }) => {
  const [addBook] = useAddBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const dispatch = useAppDispatch();
  const { isOpenModal, isEditModal } = useAppSelector(selectedBooks);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [book, setBook] = useState<TBook>({
    title: "",
    description: "",
    genre: "",
    author: "",
    isbn: "",
    copies: 0,
  });
  const navigate = useNavigate();

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleAddBook = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const parsedData = {
      ...book,
      copies: Number(book.copies),
    };

    const result = BookSchema.safeParse(parsedData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0]] = err.message;
      });
      setFieldErrors(fieldErrors);
      return;
    }

    // edit book
    if (isEditModal && bookData?._id) {
      const res = await updateBook({
        payload: result.data,
        id: bookData._id,
      });

      console.log("Update response:", res);

      if ("data" in res && res.data?.success) {
        toast.success("Book updated successfully!");
        setBook({
          title: "",
          description: "",
          genre: "",
          author: "",
          isbn: "",
          copies: 0,
        });
        setFieldErrors({});
        dispatch(setIsEditModal(false));
      }
      return;
    }

    // add book
    const res = await addBook(result.data);
    if ("data" in res && res.data?.success) {
      toast.success("Book added successfully!");
      setBook({
        title: "",
        description: "",
        genre: "",
        author: "",
        isbn: "",
        copies: 0,
      });
      setFieldErrors({});
      navigate("/");
      dispatch(setIsOpenModal(false));
    }
  };

  useEffect(() => {
    if (bookData && isEditModal) {
      setBook({
        title: bookData.title || "",
        description: bookData.description || "",
        genre: bookData.genre || "",
        author: bookData.author || "",
        isbn: bookData.isbn || "",
        copies: bookData.copies ?? 0,
      });
    }
  }, [bookData, isOpenModal]);

  return (
    <form
      onSubmit={handleAddBook}
      className='w-full lg:max-w-lg lg:h-auto sm:mt-10 sm:pb-10 mx-auto space-y-1 bg-white rounded-md p-4 h-full '
    >
      {isOpenModal && (
        <div className='flex items-center justify-end'>
          <button
            onClick={() => dispatch(setIsOpenModal(false))}
            className='text-xl size-10 font-medium px-2 py-1 cursor-pointer rounded-full bg-yellow-50 text-red-700'
          >
            x
          </button>
        </div>
      )}
      {isEditModal && (
        <div className='flex items-center justify-end'>
          <button
            onClick={() => dispatch(setIsEditModal(false))}
            className='text-xl size-10 font-medium px-2 py-1 cursor-pointer rounded-full bg-yellow-50 text-red-700'
          >
            x
          </button>
        </div>
      )}

      <h2 className='flex items-center gap-1 justify-center text-xl font-semibold'>
        {isEditModal ? " Update a Book" : " Add a Book"}
        <span className='bg-gray-500 h-0.5 w-10 mt-1'></span>
      </h2>

      {/* Title */}
      <div className='flex flex-col'>
        <label className='text-md font-medium'>Title</label>
        <input
          onChange={handleOnChange}
          value={book.title}
          name='title'
          className='px-4 py-2.5 rounded-lg border-2 border-gray-400 focus:border-gray-900 outline-none text-sm font-medium'
          type='text'
          placeholder='Book title'
        />
        {fieldErrors.title && (
          <p
            className={`${
              book.title && book.title.length > 0
                ? "hidden"
                : "text-sm text-red-500 mt-1"
            } `}
          >
            {fieldErrors.title}
          </p>
        )}
      </div>

      {/* Description */}
      <div className='flex flex-col'>
        <label className='text-md font-medium'>Description</label>
        <input
          onChange={handleOnChange}
          value={book.description}
          name='description'
          className='px-4 py-2.5 rounded-lg border-2 border-gray-400 focus:border-gray-900 outline-none text-sm font-medium'
          type='text'
          placeholder='Book description'
        />
        {fieldErrors.description && (
          <p
            className={`${
              book.description && book.description.length > 0
                ? "hidden"
                : "text-sm text-red-500 mt-1"
            } `}
          >
            {fieldErrors.description}
          </p>
        )}
      </div>

      {/* Author */}
      <div className='flex flex-col'>
        <label className='text-md font-medium'>Author</label>
        <input
          onChange={handleOnChange}
          value={book.author}
          name='author'
          className='px-4 py-2.5 rounded-lg border-2 border-gray-400 focus:border-gray-900 outline-none text-sm font-medium'
          type='text'
          placeholder='Book author'
        />
        {fieldErrors.author && (
          <p
            className={`${
              book.author && book.author.length > 0
                ? "hidden"
                : "text-sm text-red-500 mt-1"
            } `}
          >
            {fieldErrors.author}
          </p>
        )}
      </div>

      {/* Genre + Copies */}
      <div className='flex gap-2 w-full'>
        <div className='flex flex-col w-1/2'>
          <label className='text-md font-medium'>Genre</label>
          <select
            name='genre'
            value={book.genre}
            onChange={handleOnChange}
            className='px-4 py-2.5 rounded-lg border-2 border-gray-400 focus:border-gray-900 outline-none text-sm font-medium'
          >
            <option value=''>Select genre</option>
            <option value='FICTION'>FICTION</option>
            <option value='NON_FICTION'>NON_FICTION</option>
            <option value='SCIENCE'>SCIENCE</option>
            <option value='HISTORY'>HISTORY</option>
            <option value='BIOGRAPHY'>BIOGRAPHY</option>
            <option value='FANTASY'>FANTASY</option>
          </select>
          {fieldErrors.genre && (
            <p
              className={`${
                book.genre && book.genre.length > 0
                  ? "hidden"
                  : "text-sm text-red-500 mt-1"
              } `}
            >
              {fieldErrors.genre}
            </p>
          )}
        </div>

        <div className='flex flex-col w-1/2'>
          <label className='text-md font-medium'>Copies</label>
          <input
            onChange={handleOnChange}
            value={book.copies}
            name='copies'
            className='px-4 py-2.5 rounded-lg border-2 border-gray-400 focus:border-gray-900 outline-none text-sm font-medium'
            type='number'
            placeholder='Book copies'
          />
          {fieldErrors.copies && (
            <p
              className={`${
                book.copies && book.copies.toString().length > 0
                  ? "hidden"
                  : "text-sm text-red-500 mt-1"
              } `}
            >
              {fieldErrors.copies}
            </p>
          )}
        </div>
      </div>

      {/* ISBN */}
      <div className='flex flex-col'>
        <label className='text-md font-medium'>ISBN</label>
        <input
          onChange={handleOnChange}
          value={book.isbn}
          name='isbn'
          className='px-4 py-2.5 rounded-lg border-2 border-gray-400 focus:border-gray-900 outline-none text-sm font-medium'
          type='text'
          placeholder='Book ISBN'
        />
        {fieldErrors.isbn && (
          <p
            className={`${
              book.isbn && book.isbn.length > 0
                ? "hidden"
                : "text-sm text-red-500 mt-1"
            } `}
          >
            {fieldErrors.isbn}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type='submit'
        className='w-full mt-2 px-4 py-2.5 rounded-lg text-white bg-blue-700 hover:bg-blue-600 transition duration-300 text-sm font-medium'
      >
        {isEditModal ? "UPDATE BOOK" : "ADD BOOK"}
      </button>
    </form>
  );
};

export default AddBook;
