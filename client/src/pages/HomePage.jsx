import '../App.css';
import {  IconBrandX, IconBrandYoutube, IconBrandFacebook, IconBrandInstagram } from '@tabler/icons-react';

function HomePage() {
  return (
    <>
      <div className="background fixed top-0 h-screen w-full bg-cover bg-center"></div>
        <div className="relative flex h-[45rem] flex-col items-center justify-center px-4">
          <h1 className="text-[7rem] text-white mb-2">Save & Share</h1>
          <p className="text-2xl md:text-2xl text-white mb-6">Reducing Food Waste, One Meal at a Time</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg md:text-xl">
            Join Us
          </button>
        </div>
      
      {/* Socials Section */}
      <div className="absolute bottom-4 right-4 text-white flex flex-col items-end space-y-2 p-2 md:p-4">
        <p className="text-lg md:text-xl font-bold">Socials</p>
        <div className="flex space-x-4">
          <IconBrandYoutube className="text-2xl md:text-3xl cursor-pointer hover:text-red-500" />
          <IconBrandInstagram className="text-2xl md:text-3xl cursor-pointer hover:text-pink-500" />
          <IconBrandFacebook className="text-2xl md:text-3xl cursor-pointer hover:text-blue-500" />
          <IconBrandX className="text-2xl md:text-3xl cursor-pointer hover:text-gray-400" />
        </div>
      </div>



      {/*About us section*/}
      <div className="bg-white rounded-t-3xl mt-[-2rem] relative z-10 px-6 md:px-16 lg:px-24 pt-16 pb-24"
     style={{ 
       clipPath: "polygon(86% 0, 94% 4%, 100% 4%, 100% 100%, 11% 100%, 0 91%, 0 0)"
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
        eating a scheduled meal, you can use our platform to ensure that food is not wasted. NGOs 
        and food banks can then collect and distribute the surplus food to underprivileged 
        individuals or animals in need.
      </p>

      <p className="leading-relaxed">
        By working together, we can reduce food waste, feed the hungry, and create a more 
        sustainable world. Every meal counts, and your small action can make a big difference. 
        Join us in building a responsible food ecosystem—where every bite matters.
      </p>
    </div>

    <div className="flex justify-center mt-10">
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-full">
        Mail Us To Know More
      </button>
    </div>
  </div>
</div>

    </>
  );
}

export default HomePage;
