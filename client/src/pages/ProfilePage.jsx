import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMail, IconClipboardList, IconPlus, IconCash, IconLogout } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // If no user is logged in, redirect to login
  React.useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const handlePrebookMeals = () => {
    // Add your prebook logic here
    console.log("Prebooking meals...");
    navigate('/prebook');
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#EBDFD7] flex items-center justify-center p-4">
      <div className="bg-[#F8F2EF] rounded-xl shadow-md overflow-hidden w-full max-w-md">
        {/* Profile Header */}
        <div className="bg-[#e65f2b] p-6 text-center">
          <div className="mx-auto w-24 h-24 rounded-full border-4 border-white overflow-hidden">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">{currentUser.name}</h1>
          <p className="text-white/80 mt-1">{currentUser.role}</p>
        </div>
        
        {/* Profile Details */}
        <div className="p-6 space-y-6">
          {/* Email */}
          <div className="flex items-center space-x-3">
            <IconMail className="text-gray-500" size={20} />
            <span className="text-gray-700">{currentUser.email}</span>
          </div>
          
          {/* Stats Section - only show for students */}
          {currentUser.role === "student" && (
            <div className="grid grid-cols-2 gap-4">
              {/* Prebooked Meals */}
              <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <IconClipboardList className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booked Meals</p>
                  <p className="text-xl font-semibold">{currentUser.prebookedMeals}</p>
                </div>
              </div>
              
              {/* Currency Balance */}
              <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <IconCash className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Credits</p>
                  <p className="text-xl font-semibold">{currentUser.currency.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Role-specific button */}
          {currentUser.role === "student" ? (
            <button
              onClick={handlePrebookMeals}
              className="w-full bg-[#000] hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <IconPlus size={20} />
              <span>Prebook Next Meal</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/dash')}
              className="w-full bg-[#000] hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <IconClipboardList size={20} />
              <span>Go to Dashboard</span>
            </button>
          )}
          
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <IconLogout size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;