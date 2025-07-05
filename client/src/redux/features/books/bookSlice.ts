import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { TBook } from "../../../types/type";

//for typescript some of them i have taken help from GPT
type TPagination = {
  currentPage?: number;
  nextPage?: number | null;
  prevPage?: number | null;
  totalpage?: number;
};

type TBookState = {
  isOpenModal: boolean;
  isBorrowModal: boolean;
  isEditModal: boolean;
  isDeleteModal: boolean;
  books: TBook[];
  book: Partial<TBook> | {};
  pagination: TPagination;
};

const initialState: TBookState = {
  isOpenModal: false,
  isEditModal: false,
  isBorrowModal: false,
  isDeleteModal: false,
  books: [],
  book: {},
  pagination: {
    currentPage: 1,
    nextPage: null,
    prevPage: null,
  },
};

const booksSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    //all modal logic are here
    setIsOpenModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenModal = action.payload;
    },
    setIsBorrowModal: (state, action: PayloadAction<boolean>) => {
      state.isBorrowModal = action.payload;
    },
    setIsDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.isDeleteModal = action.payload;
    },
    setIsEditModal: (state, action: PayloadAction<boolean>) => {
      state.isEditModal = action.payload;
    },
    //get all books using querys
    getAllBooks: (
      state,
      action: PayloadAction<{ books: TBook[]; pagination: TPagination }>
    ) => {
      state.books = action.payload.books;
      state.pagination = action.payload.pagination;
    },
    //update
    updateBook: (state, action: PayloadAction<string>) => {
      const foundBook = state.books.find((book) => book._id === action.payload);
      if (foundBook) {
        state.isEditModal = true;
        state.book = foundBook;
      }
    },
    //borrow
    borrowBook: (state, action: PayloadAction<string>) => {
      const foundBook = state.books.find((book) => book._id === action.payload);
      if (foundBook) {
        state.isBorrowModal = true;
        state.book = foundBook;
      }
    },

    // pagination logic is here
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setNextPage: (state, action: PayloadAction<number | null>) => {
      state.pagination.nextPage = action.payload;
    },
    setPrevPage: (state, action: PayloadAction<number | null>) => {
      state.pagination.prevPage = action.payload;
    },
    setPagination: (state, action: PayloadAction<TPagination>) => {
      state.pagination = action.payload;
    },
  },
});

export const selectedBooks = (state: RootState) => state.books;

export const {
  setIsOpenModal,
  setIsDeleteModal,
  updateBook,
  getAllBooks,
  setIsBorrowModal,
  setIsEditModal,
  borrowBook,
  setPage,
  setNextPage,
  setPrevPage,
  setPagination,
} = booksSlice.actions;

export default booksSlice.reducer;
