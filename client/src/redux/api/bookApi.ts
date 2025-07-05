import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GetAllBooksParams, TBook } from "../../types/type";
const baseUrl = import.meta.env.VITE_BASE_URL as string;

export const bookApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl}),
  tagTypes: ["books", "borrow"],
  endpoints: (builder) => ({
    //create book mutation
    addBook: builder.mutation({
      query: (payload) => ({
        url: "/books",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["books"],
    }),
    //update book mutation
    updateBook: builder.mutation({
      query: ({ payload, id }) => ({
        url: `/books/edit-book/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["books"],
    }),
    //delete book mutation

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    //get a book mutation

    getBook: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
        method: "GET",
      }),
    }),
    // get all books querym
    getAllBook: builder.query<TBook, GetAllBooksParams>({
      query: (params) => {
        const page = params?.page ?? 1;
        const limit = params?.limit ?? 10;
        return `/books?page=${page}&limit=${limit}`;
      },
      providesTags: ["books"],
    }),
  }),
});

export const {
  useGetAllBookQuery,
  useGetBookQuery,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = bookApi;
