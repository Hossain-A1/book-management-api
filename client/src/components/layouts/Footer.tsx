import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className=" bg-slate-100 mt-10 text-center text-sm text-gray-600 w-full border-t md:py-10 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Site Info */}
        <p className="text-gray-700 font-medium">
          © {new Date().getFullYear()} Library System. All rights reserved.
        </p>

        {/* Navigation Links */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            to="/all-books"
            className="hover:text-blue-600 transition-colors"
          >
            All Books
          </Link>
          <Link
            to="/add-book"
            className="hover:text-blue-600 transition-colors"
          >
            Add Book
          </Link>
          <Link
            to="/borrow-summary"
            className="hover:text-blue-600 transition-colors"
          >
            Borrow Summary
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
