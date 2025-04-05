import React, { useState } from "react";
import { IconUser, IconMenu2, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Define links based on user role
  const getNavLinks = () => {
    if (!currentUser) {
      return []; // No navigation links if not logged in
    }
    
    if (currentUser.role === "admin") {
      return [
        {
          to: "/dash",
          text: "Dashboard"
        }
      ];
    } else {
      return [
        {
          to: "/prebook",
          text: "Book Meals"
        }
      ];
    }
  };

  const navLinks = getNavLinks();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 py-4 flex justify-between items-center bg-white shadow-sm">
      <div className="flex items-center">
      <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded w-auto h-auto">
  <img src="/src/assets/logo.png" alt="Company Logo" className="h-6 sm:h-8 w-auto" // Responsive height
    width={170} height={30} loading="lazy" />
  </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-[#E65F2B] hover:text-[#171717] transition-colors duration-200 font-medium"
          >
            {link.text}
          </Link>
        ))}
        
        {currentUser ? (
          <div className="flex items-center space-x-4 ml-4">
            <Link to="/profile" className="relative">
              <img
                className="h-10 rounded-full border-2 border-rose-100"
                src={currentUser.avatar}
                alt="User Profile"
              />
              <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full">
                <IconUser size={10} />
              </div>
            </Link>
            {!navLinks.length && (
              <Link
                to="/login"
                className="bg-[#E65F2B] text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-[#E65F2B] text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        {currentUser && (
          <Link to="/profile" className="relative mr-4">
            <img
              className="h-10 rounded-full border-2 border-rose-100"
              src={currentUser.avatar}
              alt="User Profile"
            />
            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full">
              <IconUser size={10} />
            </div>
          </Link>
        )}
        
      </div>
      

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-6">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[#E65F2B] hover:text-[#171717] transition-colors duration-200 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
            {!currentUser && (
              <Link
                to="/login"
                className="bg-[#E65F2B] text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;