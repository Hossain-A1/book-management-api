import { useGetAllBorrowedBookQuery } from "../../redux/api/borrowApi";
import Loading from "../ui/Loading";
import Error from "../ui/Error";
type TBorrowSummaryItem = {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
};

const BorrowSummary = () => {
  const {
    data: borrowedBook,
    isLoading,
    isError,
  } = useGetAllBorrowedBookQuery(undefined);
  return (
    <div className='sp w-full  lg:px-10 py-4 h-screen'>
      {isLoading && <Loading />}
      {isError && <Error error={isError} />}

      <h2 className='flex items-center gap-1 justify-center text-xl sm:text-2xl font-semibold mb-4 sm:mb-8'>
        📃 Borrow Summary
        <span className='bg-gray-500 h-0.5 w-10 mt-1'></span>
      </h2>

      <div className='overflow-x-auto rounded shadow'>
        <table className='min-w-full divide-y divide-gray-200 text-sm bg-white'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-3 text-left font-medium text-gray-700'>
                Book Title
              </th>
              <th className='px-4 py-3 text-left font-medium text-gray-700'>
                ISBN
              </th>
              <th className='px-4 py-3 text-left font-medium text-gray-700'>
                Total Borrowed
              </th>
            </tr>
          </thead>
          <tbody>
            {borrowedBook?.data?.length > 0 ? (
              borrowedBook.data.map((item: TBorrowSummaryItem) => (
                <tr
                  key={item.book.isbn}
                  className='border-t hover:bg-gray-50 transition'
                >
                  <td className='px-4 py-2'>{item.book?.title || "N/A"}</td>
                  <td className='px-4 py-2'>{item.book?.isbn || "N/A"}</td>
                  <td className='px-4 py-2'>{item.totalQuantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className='px-4 py-4 text-center text-gray-500'>
                  No borrowed books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowSummary;
