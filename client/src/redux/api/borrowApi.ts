import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_BASE_URL as string;

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["borrow", "books"],
  endpoints: (builder) => ({
    //create book mutation

    borrowBook: builder.mutation({
      query: ({ payload, bookid }) => ({
        url: `/borrow/${bookid}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["borrow", "books"],
    }),

    getAllBorrowedBook: builder.query({
      query: () => "/borrow",
      providesTags: ["borrow"],
    }),
  }),
});

export const { useGetAllBorrowedBookQuery, useBorrowBookMutation } = borrowApi;
