import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMail, IconClipboardList, IconPlus, IconCash, IconLogout, IconQrcode, IconX } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';
import QRCode from 'react-qr-code';

const ProfilePage = () => {
  const { currency, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);

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
    navigate('/prebook');
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  return (
    <div className="min-h-screen bg-[#EBDFD7] flex items-center justify-center p-4 relative">
      {/* QR Code Modal - Now using transparent background */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full relative">
            <button 
              onClick={toggleQR}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close QR code"
            >
              <IconX size={24} />
            </button>
            
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold mb-2">Your Credits: {currency.toFixed(2)}</h3>
              <p className="text-gray-600">Scan this QR at the cafeteria</p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-gray-200 flex justify-center">
              <QRCode 
                value="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                size={200}
                level="H"
              />
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Show this to the cashier when making a purchase
            </p>
          </div>
        </div>
      )}

      {/* Profile Content */}
      <div className="bg-[#F8F2EF] rounded-xl shadow-md overflow-hidden w-full max-w-md">
        {/* Profile Header */}
        <div className="bg-[#e65f2b] p-6 text-center">
          <div className="mx-auto w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
            <img
              src={currentUser.avatar || 'https://via.placeholder.com/150'}
              alt={`${currentUser.name}'s profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-white">{currentUser.name}</h1>
          <p className="text-white/80 mt-1">{currentUser.role}</p>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Email */}
          <div className="flex items-center space-x-3">
            <IconMail className="text-gray-500" size={20} />
            <span className="text-gray-700">{currentUser.email}</span>
          </div>
          
          {/* Stats Section - only show for students */}
          {currentUser.role === "student" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {/* Prebooked Meals */}
                <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-3 transition-all hover:shadow-md">
                  <div className="bg-indigo-100 p-2 rounded-full">
                    <IconClipboardList className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booked Meals</p>
                    <p className="text-xl font-semibold">{currentUser.prebookedMeals || 0}</p>
                  </div>
                </div>
                
                {/* Currency Balance */}
                <div className="bg-gray-100 rounded-lg p-4 flex items-center space-x-3 transition-all hover:shadow-md">
                  <div className="bg-green-100 p-2 rounded-full">
                    <IconCash className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Credits</p>
                    <p className="text-xl font-semibold">{currency.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              {/* QR Code Button */}
              <button
                onClick={toggleQR}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors shadow-md"
                aria-label="Show QR code for credits"
              >
                <IconQrcode size={20} />
                <span>Your Credit QR</span>
              </button>
            </>
          )}
          
          {/* Role-specific button */}
          {currentUser.role === "student" ? (
            <button
              onClick={handlePrebookMeals}
              className="w-full bg-[#000] hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors shadow-md"
              aria-label="Prebook next meal"
            >
              <IconPlus size={20} />
              <span>Prebook Next Meal</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/dash')}
              className="w-full bg-[#000] hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors shadow-md"
              aria-label="Go to dashboard"
            >
              <IconClipboardList size={20} />
              <span>Go to Dashboard</span>
            </button>
          )}
          
          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors shadow-md"
            aria-label="Sign out"
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