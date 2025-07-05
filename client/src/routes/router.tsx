//data mode approach
import { createBrowserRouter } from "react-router";
import App from "../App";
import AllBooksPage from "../pages/AllBooksPage";
import AddBookPage from "../pages/AddBookPage";
import BorrowSumarryPage from "../pages/BorrowSumarryPage";
import BookDetailsPage from "../pages/BookDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

    children: [
      {
        index: true,
        Component: AllBooksPage,
      },
      {
        path: "/all-books",
        Component: AllBooksPage,
      },
      {
        path: "/all-books/:id",
        Component: BookDetailsPage,
      },
      {
        path: "/add-book",
        Component: AddBookPage,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSumarryPage,
      },
    ],
  },
]);

export default router;
