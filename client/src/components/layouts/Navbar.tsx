import { useState } from "react";
import { Link, useLocation } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";

type TNavLinks = {
  label: string;
  href: string;
}[];

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: TNavLinks = [
    { label: "All Books", href: "/all-books" },
    { label: "Add Book", href: "/add-book" },
    { label: "Borrow Summary", href: "/borrow-summary" },
  ];

  return (
    <nav className='h-16 px-4 bg-slate-100 flex justify-between items-center shadow relative'>
      {/* Logo */}
      <Link to='/' className='text-lg sm:text-xl font-bold text-blue-700'>
       Mybrary
      </Link>

      {/* Desktop Nav */}
      <div className='hidden md:flex gap-4 items-center'>
        {navLinks.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <Link
              key={link.label}
              to={link.href}
              className={`px-3 py-1 rounded-md font-medium transition-all duration-200 ${
                isActive ? "text-blue-600" : "text-gray-700 hover:bg-blue-100"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Icon */}
      <div className='md:hidden'>
        <button onClick={() => setIsMenuOpen((prev) => !prev)} className='text-2xl'>
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className='absolute top-16 left-0 w-full bg-white shadow-md z-10 md:hidden'>
          {navLinks.map((link) => {
            const isActive = currentPath === link.href;
            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 border-b ${
                  isActive ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:bg-blue-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
