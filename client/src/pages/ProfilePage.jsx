import { IconMail, IconCurrencyDollar, IconClipboardList, IconPlus, IconCash } from '@tabler/icons-react';

const ProfilePage = () => {
  // Sample user data - replace with your actual data
  const user = {
    name: "God or What",
    email: "iamthegod@example.com",
    prebookedMeals: 8,
    currency: 125.50,
    avatar: "https://avatar.iran.liara.run/public/98"
  };

  const handlePrebookMeals = () => {
    // Add your prebook logic here
    console.log("Prebooking meals...");
  };

  return (
    <div className="min-h-screen bg-[#EBDFD7] flex items-center justify-center p-4">
      <div className="bg-[#F8F2EF] rounded-xl shadow-md overflow-hidden w-2xl">
        {/* Profile Header */}
        <div className="bg-[#e65f2b] p-6 text-center">
          <div className="mx-auto w-24 h-24 rounded-full border-4 border-white overflow-hidden">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">{user.name}</h1>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-6">
          {/* Email */}
          <div className="flex items-center space-x-3">
            <IconMail className="text-gray-500" size={20} />
            <span className="text-gray-700">{user.email}</span>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 gap-4">
            {/* Prebooked Meals */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-indigo-100 p-2 rounded-full">
                <IconClipboardList className="text-indigo-600" size={20} />
              </div>
              <div> 
                <p className="text-sm text-gray-500">Booked Meals</p>
                <p className="text-xl font-semibold">{user.prebookedMeals}</p>
              </div>
            </div>

            {/* Currency Balance */}
            <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <IconCash className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Credits</p>
                <p className="text-xl font-semibold">{user.currency.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Prebook Button */}
          <button 
            onClick={handlePrebookMeals}
            className="w-full bg-[#000] hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <IconPlus size={20} />
            <span>Prebook Next Meal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;