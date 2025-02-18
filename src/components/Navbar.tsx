import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, useCurrentUser } from "../redux/feature/auth/authSlice";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="sticky bg-gradient-to-r from-[#1B1B31] via-purple-500 to-[#1B1B31] text-white  w-full z-10 py-3">

      <div className="max-w-[90%] mx-auto">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <Link to="/" className="text-3xl font-bold">
          <h2 className="text-3xl font-bold text-[#6a00f4] font-lobster">
              rfBook<span className="text-purple-500">Nest</span>
            </h2>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-lg hover:text-blue-500">
              Home
            </Link>
            <Link to="/all-product" className="text-lg hover:text-blue-500">
              All Products
            </Link>
            <Link to="/gallery" className="text-lg hover:text-blue-500">
              Gallery
            </Link>
            <Link to="/about" className="text-lg hover:text-blue-500">
              About Us
            </Link>
            <Link to="/contact-us" className="text-lg hover:text-blue-500">
              Contact us
            </Link>
            {!user && (
              <Link to="/login" className="text-lg hover:text-blue-500">
                Login
              </Link>
            )}

            {user && (
              <div className="relative">
                {/* Avatar */}
                <div
                  className="rounded-full overflow-hidden cursor-pointer"
                  onClick={toggleDropdown}
                  aria-label="User Menu"
                >
                  <img
                    src={user?.imageUrl}
                    alt="User Avatar"
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gradient-to-br from-[#6a00f4] via-transparent to-purple-500 bg-black text-whit z-10  border border-gray-200 rounded-lg shadow-lg">
                    <ul className="py-1">
                      <li>
                        {user && (
                          <Link
                            to={`/${user.role}/dashboard`}
                            className="block w-full text-left px-4 py-2 hover:bg-gradient-to-br from-purple-500 via-transparent to-[#6a00f4] "
                          >
                            Dashboard
                          </Link>
                        )}
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 hover:hover:bg-gradient-to-br from-purple-500 via-transparent to-[#6a00f4]"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-2xl"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#1B1B31] via-[#2B1E36] to-[#1B1B31] space-y-4 py-4 px-6">
          <Link to="/" className="block text-lg hover:text-blue-500">
            Home
          </Link>
          <Link
            to="/all-product"
            className="block text-lg hover:text-blue-500"
          >
            All Products
          </Link>
          <Link to="/about-us" className="block text-lg hover:text-blue-500">
            All Products
          </Link>
          {!user && (
            <Link to="/login" className="block text-lg hover:text-blue-500">
              About Us
            </Link>
          )}
          {user && (
            <Link
              to={`/${user.role}/dashboard`}
              className="block text-lg hover:text-blue-500"
            >
              Dashboard
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-lg hover:text-blue-500"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;