import { MdModeEdit, MdDelete, MdOutlineAdd } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import {
  useDeleteBookMutation,
  useGetAllBookQuery,
} from "../../redux/api/bookApi";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
import type { TBook } from "../../types/type";
import Overlay from "../ui/Overlay";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  borrowBook,
  getAllBooks,
  selectedBooks,
  setIsDeleteModal,
  setIsOpenModal,
  setPage,
  updateBook,
} from "../../redux/features/books/bookSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BorrowBook from "../ui/BorrowBook";
import AddBook from "./AddBook";
import DeletDialog from "../ui/DeletDialog";
import { Link } from "react-router";

const BookLists = () => {
  const [onConfirmDelete, setOnConfirmDelete] = useState<() => void>(() => {});
  const dispatch = useAppDispatch();

  const {
    book,
    isOpenModal,
    isBorrowModal,
    isDeleteModal,
    isEditModal,
    pagination,
  } = useAppSelector(selectedBooks);

  const {
    data: books,
    isLoading,
    isError,
  } = useGetAllBookQuery({ page: pagination.currentPage, limit: 10 });

  // Delete book handler
  const [deleteBook] = useDeleteBookMutation();
  const handleDeleteBook = (id: string) => {
    return async () => {
      try {
        const res = await deleteBook(id);
        if (res.data?.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data?.message || "Failed to delete.");
        }
      } catch {
        toast.error("Something went wrong.");
      }
    };
  };

  useEffect(() => {
    if (books) {
      dispatch(getAllBooks({ books: books.data || [], pagination: books.pagination ||{}}));
    }
  }, [books, dispatch]);

  // Pagination handlers
  const handlePrevPage = () => {
    if (pagination.prevPage) {
      dispatch(setPage(pagination.prevPage));
    }
  };

  const handleNextPage = () => {
    if (pagination.nextPage) {
      dispatch(setPage(pagination.nextPage));
    }
  };

  return (
    <div className='w-full h-full relative px-2 md:px-4'>
      {isLoading && <Loading />}
      {isError && <Error error={isError} />}

      {/* Header */}
      <div className='flex gap-2 justify-between items-start md:items-center mb-4'>
        <h1 className='text-2xl font-bold'>Book Lists</h1>
        <button
          onClick={() => dispatch(setIsOpenModal(true))}
          className='bg-blue-600 text-white flex items-center gap-1 px-4 py-2 rounded hover:bg-blue-700 transition'
        >
          <MdOutlineAdd className='text-lg sm:text-xl' /> <span>Add Book</span>
        </button>
      </div>

      {/* Responsive Table Grid Wrapper */}
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white shadow rounded-md'>
          <thead className='bg-gray-100'>
            <tr className='text-left text-sm text-gray-700'>
              <th className='px-4 py-2'>Title</th>
              <th className='px-4 py-2'>Author</th>
              <th className='px-4 py-2'>Genre</th>
              <th className='px-4 py-2'>ISBN</th>
              <th className='px-4 py-2'>Copies</th>
              <th className='px-4 py-2'>Availability</th>
              <th className='px-4 py-2 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              books?.data?.map((book: TBook) => (
                <tr
                  key={book._id}
                  className='border-t hover:bg-gray-50 transition'
                >
                  <td className='px-4 py-2'>
                    {book.title.substring(0, 30)}...
                  </td>
                  <td className='px-4 py-2'>{book.author}</td>
                  <td className='px-4 py-2'>{book.genre}</td>
                  <td className='px-4 py-2'>{book.isbn}</td>
                  <td className='px-4 py-2'>{book.copies}</td>
                  <td className='px-4 py-2'>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        book.copies > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.copies > 0 ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className='px-4 py-2'>
                    <div className='flex justify-center items-center gap-2'>
                      <abbr title='Edit'>
                        <MdModeEdit
                          onClick={() =>
                            dispatch(updateBook(book._id as string))
                          }
                          className='text-yellow-600 cursor-pointer hover:scale-110 transition size-5'
                        />
                      </abbr>
                      <abbr title='Delete'>
                        <MdDelete
                          onClick={() => {
                            setOnConfirmDelete(() =>
                              handleDeleteBook(book._id as string)
                            );
                            dispatch(setIsDeleteModal(true));
                          }}
                          className='text-red-600 cursor-pointer hover:scale-110 transition size-5'
                        />
                      </abbr>
                      <abbr title='Borrow'>
                        <FaBook
                          onClick={() =>
                            book.copies > 0 &&
                            dispatch(borrowBook(book._id as string))
                          }
                          className={`size-5 transition ${
                            book.copies > 0
                              ? "text-blue-600 cursor-pointer hover:scale-110"
                              : "text-gray-400 cursor-not-allowed"
                          }`}
                        />
                      </abbr>
                      <Link
                        to={`/all-books/${book._id}`}
                        className='text-xs font-medium px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition'
                      >
                        VIEW
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className='flex justify-center items-center gap-4 my-4'>
        <button
          disabled={!pagination.prevPage}
          onClick={handlePrevPage}
          className={`px-4 py-2 rounded ${
            pagination.prevPage
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <span>
          Page {pagination.currentPage ||1}
          {pagination.totalpage ? `of ${pagination.totalpage}` : ""}
        </span>
        <button
          disabled={!pagination.nextPage}
          onClick={handleNextPage}
          className={`px-4 py-2 rounded ${
            pagination.nextPage
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modals */}
      {isOpenModal && (
        <>
          <Overlay />
          <div className='absolute z-50 max-md:top-0 max-md:left-0 h-full w-full md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2'>
            <AddBook bookData={book} />
          </div>
        </>
      )}

      {isEditModal && (
        <>
          <Overlay />
          <div className='absolute z-50 max-md:top-0 max-md:left-0 h-full w-full md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2'>
            <AddBook bookData={book} />
          </div>
        </>
      )}

      {isBorrowModal && (
        <>
          <Overlay />
          <div className='absolute bg-white z-50 max-md:top-0 max-md:left-0 h-full sm:max-w-sm sm:max-h-96 rounded-xl w-full md:top-1/2 md:left-1/2 transform md:-translate-x-1/2 md:-translate-y-1/2'>
            <BorrowBook book={book} />
          </div>
        </>
      )}

      {isDeleteModal && <DeletDialog onConfirmDelete={onConfirmDelete} />}
    </div>
  );
};

export default BookLists;
