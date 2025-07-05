import { Link } from "react-router";

const Error = ({ error }: { error: boolean }) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      {error && (
        <div className='space-y-4'>
          <p className='text-xl font-semibold'>Something went wrong!</p>
          <Link to='/' className='px-4 py-2 rounded bg-red-700 text-white'>
            Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default Error;
