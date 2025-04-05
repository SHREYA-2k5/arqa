import React, { useState } from "react";
import { IconMail, IconPhone, IconMapPin, IconCheck, IconX, IconClipboardList } from '@tabler/icons-react';

const DonationStatus = ({ formData, currentStage, submissionStatus, selectedNGO, onAcceptRequest, onResetForm }) => {
  const [showNGOs, setShowNGOs] = useState(false);

  // Dummy NGOs data - streamlined
  const dummyNGOs = [
    {
      id: 1,
      name: "Feed The Hunger Foundation",
      email: "contact@feedthehunger.org",
      phone: "+91 9876543210",
      address: "123 Service Road, Mumbai",
      accepted: true
    },
    {
      id: 3,
      name: "No Hunger Initiative",
      email: "support@nohunger.org",
      phone: "+91 7654321098",
      address: "789 Helping Street, Bangalore",
      accepted: true
    }
  ];

  const statusStages = [
    { 
      id: 'created', 
      label: 'Request Created', 
      description: 'Your request has been submitted and is awaiting admin approval.' 
    },
    { 
      id: 'accepted', 
      label: 'Approved by Admin', 
      description: 'Your request has been approved and is visible to NGOs.' 
    },
    { 
      id: 'completed', 
      label: 'Food Collected', 
      description: 'The food has been collected by an NGO.' 
    }
  ];

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border-10 border-white">
      {/* Header */}
      <div className="bg-orange-500 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">Donation Request Status</h2>
        <p className="text-orange-100 mt-1">Track your food donation request</p>
      </div>
      
      <div className="p-8 space-y-6">
        {/* Status Bar */}
        <div className="relative">
          <div className="flex justify-between mb-2">
            {statusStages.map((stage, index) => (
              <div 
                key={stage.id}
                className={`text-center ${index < statusStages.length - 1 ? 'w-1/3' : 'w-1/3'}`}
              >
                <div className={`flex items-center justify-center w-10 h-10 mx-auto rounded-full ${
                  currentStage >= index ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStage > index ? <IconCheck size={20} /> : index + 1}
                </div>
                <h3 className={`text-sm font-medium mt-2 ${
                  currentStage >= index ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {stage.label}
                </h3>
              </div>
            ))}
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-orange-500 rounded-full transition-all duration-500" 
                    style={{ width: `${(currentStage / (statusStages.length - 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status Details */}
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
          <h3 className="text-lg font-medium text-gray-800">
            {statusStages[currentStage].label}
          </h3>
          <p className="text-gray-600 mt-1">
            {statusStages[currentStage].description}
          </p>
          
          {/* Show NGO acceptance button when in accepted state */}
          {currentStage === 1 && (
            <button
              onClick={() => setShowNGOs(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center"
            >
              <IconClipboardList className="mr-2" size={18} />
              View NGO Acceptances
            </button>
          )}
        </div>

        {/* Show form data for reference */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Request Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Contact Person</p>
              <p className="text-gray-800">{formData.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-gray-800">{formData.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Organization</p>
              <p className="text-gray-800">{formData.organization}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Organization Type</p>
              <p className="text-gray-800">{formData.organizationType}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-gray-800">{formData.address}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">City</p>
              <p className="text-gray-800">{formData.city}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-gray-800">{formData.phone}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-xs text-gray-500 mb-2">Food Details</p>
            <div className="space-y-2">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-800">Food Type</span>
                <span className="text-gray-600">{formData.foodDetails}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-800">Quantity</span>
                <span className="text-gray-600">{formData.quantity}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-800">Best Before</span>
                <span className="text-gray-600">{formData.bestBefore}</span>
              </div>
            </div>
          </div>
          
          {selectedNGO && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-medium text-green-800 mb-2">Food Collected By:</h4>
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <p className="font-medium">{selectedNGO.name}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <IconMail className="mr-2" size={14} />
                    <span>{selectedNGO.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <IconPhone className="mr-2" size={14} />
                    <span>{selectedNGO.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <IconMapPin className="mr-2" size={14} />
                    <span>{selectedNGO.address}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {currentStage === statusStages.length - 1 && (
          <button
            onClick={onResetForm}
            className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Create New Request
          </button>
        )}
      </div>

      {/* NGO Acceptance Modal - WITH TRANSPARENT BACKDROP */}
      {showNGOs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">NGO Acceptances</h3>
                <button 
                  onClick={() => setShowNGOs(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <IconX size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                {dummyNGOs.filter(ngo => ngo.accepted).map(ngo => (
                  <div key={ngo.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-800">{ngo.name}</h4>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <IconMail className="mr-2" size={14} />
                          <span>{ngo.email}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <IconPhone className="mr-2" size={14} />
                          <span>{ngo.phone}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <IconMapPin className="mr-2" size={14} />
                          <span>{ngo.address}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onAcceptRequest(ngo);
                          setShowNGOs(false);
                        }}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Mark as Collected
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => setShowNGOs(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationStatus;