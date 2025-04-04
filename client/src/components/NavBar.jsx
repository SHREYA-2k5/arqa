import React, { useState, useEffect } from "react";
import { IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const navLinks = [
  {
    to: "/dash",
    text: "Go To Dash"
  },
  {
    to: "/prebook",
    text: "Go To Book"
  }
];

function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <nav className={`sticky top-0 z-50 px-6 py-4 flex justify-between items-center transition-colors duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent shadow-sm'}`}>
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
            className={`text-[#E65F2B] hover:text-[#171717] transition-colors duration-200 font-medium ${scrolled ? 'text-[#171717] hover:text-[#E65F2B]' : ''}`}
          >
            {link.text}
          </Link>
        ))}

        <div className="flex items-center space-x-4 ml-4">
          <Link to={'/profile'} className="relative">
            <img
              className="h-10 rounded-full border-2 border-rose-100" 
              src="https://avatar.iran.liara.run/public/98"   
            />
            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full">
              <IconUser size={10} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;