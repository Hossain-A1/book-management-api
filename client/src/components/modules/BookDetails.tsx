import { useGetBookQuery } from "../../redux/api/bookApi";
import { useParams } from "react-router";
import Loading from "../ui/Loading";
import Error from "../ui/Error";

const url = import.meta.env.SERVER_URL
console.log(url);

const BookDetails = () => {
  const { id } = useParams();
  const { data:book, isError, isLoading } = useGetBookQuery(id);
console.log(isError);
  const {
    title,
    author,
    genre,
    isbn,
    description,
    copies,
    available,
    createdAt,
    updatedAt,
  } = book&& book.data || {};

  return (
    <div className='max-w-4xl mx-auto px-4 py-8 min-h-screen'>
      {isLoading && <Loading />}
      {isError && <Error error={isError} />}
      <div className='bg-white shadow-md rounded-lg p-6 md:p-10 space-y-4'>
        <h1 className='text-3xl font-bold text-center text-blue-800'>
          {title}
        </h1>
        <p className='text-gray-700 text-center italic'>by {author}</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base'>
          <div>
            <strong>Genre:</strong> {genre}
          </div>
          <div>
            <strong>ISBN:</strong> {isbn}
          </div>
          <div>
            <strong>Copies Available:</strong> {copies}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <span className={available ? "text-green-600" : "text-red-600"}>
              {available ? "Available" : "Not Available"}
            </span>
          </div>
          <div>
            <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
          </div>
          <div>
            <strong>Last Updated:</strong>{" "}
            {new Date(updatedAt).toLocaleString()}
          </div>
        </div>

        <div className='mt-4'>
          <h2 className='font-semibold text-lg'>Description</h2>
          <p className='text-gray-800'>
            {description || "No description provided."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
