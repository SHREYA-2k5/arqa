import '../App.css';
import { IconBrandX, IconBrandYoutube, IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react';

function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="background fixed top-0 h-screen w-full bg-cover bg-center -z-10"></div>
      <div className="relative flex h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl text-white mb-4 font-bold">Save & Share</h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">Reducing Food Waste, One Meal at a Time</p>
        <button className="bg-orange-500 hover:bg-black text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
          Join Us
        </button>
      </div>

      {/* Socials Section - Left Aligned */}
      <div className="fixed bottom-6 left-6 z-20">
        <div className="flex flex-col space-y-4">
          <p className="text-orange-500 text-lg font-medium">Follow Us</p>
          <div className="flex space-x-4">
            <IconBrandFacebook className="text-2xl text-orange-500 hover:text-black cursor-pointer transition" />
            <IconBrandInstagram className="text-2xl text-orange-500 hover:text-black cursor-pointer transition" />
            <IconBrandYoutube className="text-2xl text-orange-500 hover:text-black cursor-pointer transition" />
            <IconBrandX className="text-2xl text-orange-500 hover:text-black cursor-pointer transition" />
          </div>
        </div>
      </div>

      {/* About Us Section with Original Clip-Path */}
      <div className="bg-white rounded-t-3xl mt-[-2rem] relative z-10 px-6 md:px-16 lg:px-24 pt-16 pb-24"
        style={{ 
          clipPath: "polygon(69% 0, 84% 10%, 100% 10%, 100% 100%, 10% 100%, 0 100%, 0 0)"
        }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-500 text-center mb-8">About Us</h2>
          <div className="text-center mb-8">
            <p className="text-lg">Welcome to <span className="font-medium tracking-wider">ARQA</span></p>
          </div>

          <div className="space-y-6 text-lg">
            <p className="leading-relaxed">
              Food waste is a growing problem, especially in hostels, restaurants, and student 
              communities. Every day, tons of perfectly good food go to waste, while millions of people 
              and stray animals struggle to find their next meal. Rescue & Share is here to change that.
            </p>

            <p className="leading-relaxed">
              Our platform acts as a bridge between food providers and those in need. Whether you're a 
              restaurant with extra food, a hostel owner managing meals, or a student who won't be 
              eating a scheduled meal, you can use our platform to ensure that food is not wasted.
            </p>

            <p className="leading-relaxed">
              By working together, we can reduce food waste, feed the hungry, and create a more 
              sustainable world. Every meal counts, and your small action can make a big difference.
            </p>
          </div>

          <div className="flex justify-center mt-12">
            <button className="bg-orange-500 hover:bg-black text-white font-medium py-3 px-8 rounded-full transition duration-300">
              Mail Us To Know More
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-orange-500 mb-4">Save & Share</h3>
            <p className="text-gray-400">Reducing food waste through community sharing and responsible distribution.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">info@saveandshare.com</p>
            <p className="text-gray-400 mb-4">+1 (123) 456-7890</p>
            <div className="flex space-x-4">
              <IconBrandFacebook className="text-xl text-orange-500 hover:text-black cursor-pointer transition" />
              <IconBrandInstagram className="text-xl text-orange-500 hover:text-black cursor-pointer transition" />
              <IconBrandYoutube className="text-xl text-orange-500 hover:text-black cursor-pointer transition" />
              <IconBrandX className="text-xl text-orange-500 hover:text-black cursor-pointer transition" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Save & Share. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;