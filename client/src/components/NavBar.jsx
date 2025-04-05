import React from "react";
import { IconUser } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

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

  return (
    <nav className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center bg-white shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
          <img
            src="/src/assets/logo.png"
            alt="Company Logo"
            className="h-8 w-auto"
            width={200}
            height={30}
          />
        </Link>
      </div>
      <div className="md:flex items-center space-x-8">
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
    </nav>
  );
}

export default NavBar;