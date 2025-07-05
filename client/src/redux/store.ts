import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./api/bookApi";
import bookReducer from "../redux/features/books/bookSlice";
import { borrowApi } from "./api/borrowApi";

const store = configureStore({
  reducer: {
    books: bookReducer,
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,
  },
  middleware: (getDeafultMiddleware) =>
    getDeafultMiddleware().concat(bookApi.middleware,borrowApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
