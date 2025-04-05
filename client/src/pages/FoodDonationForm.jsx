import React, { useState } from "react";
import { IconClipboardList } from '@tabler/icons-react';
import DonationStatus from "./Donatestatus";

const FoodDonationForm = () => {
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    organizationType: 'College',
    address: '',
    city: '',
    phone: '',
    foodDetails: '',
    quantity: '',
    bestBefore: '',
    inventory: [{ item: '', quantity: '' }]
  });

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); 
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedNGO, setSelectedNGO] = useState(null);

  // Simulate sending email with approval button
  const sendApprovalEmail = () => {
    console.log(`Email sent to admin with approval link for request`);
  };

  // Simulate admin approving the request
  const simulateAdminApproval = () => {
    sendApprovalEmail();
    
    // This would normally happen when admin clicks the approval button in email
    setTimeout(() => {
      setCurrentStage(1);
      setSubmissionStatus('accepted');
    }, 3000);
  };

  // Simulate NGO picking up the food
  const simulateNGOPickup = () => {
    setTimeout(() => {
      setCurrentStage(2);
      setSubmissionStatus('completed');
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInventoryChange = (index, field, value) => {
    const updatedInventory = [...formData.inventory];
    updatedInventory[index][field] = value;
    setFormData(prev => ({
      ...prev,
      inventory: updatedInventory
    }));
  };

  const addInventoryRow = () => {
    setFormData(prev => ({
      ...prev,
      inventory: [...prev.inventory, { item: '', quantity: '' }]
    }));n
  };

  const removeInventoryRow = (index) => {
    if (formData.inventory.length > 1) {
      const updatedInventory = [...formData.inventory];
      updatedInventory.splice(index, 1);
      setFormData(prev => ({
        ...prev,
        inventory: updatedInventory
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('created');
    setCurrentStage(0);
    
    // Simulate API call to create request
    setTimeout(() => {
      console.log('Request created:', formData);
      setIsSubmitting(false);
      
      // Start the approval process
      simulateAdminApproval();
    }, 1500);
  };

  const handleAcceptRequest = (ngo) => {
    setSelectedNGO(ngo);
    simulateNGOPickup();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      organizationType: 'College',
      address: '',
      city: '',
      phone: '',
      foodDetails: '',
      quantity: '',
      bestBefore: '',
      inventory: [{ item: '', quantity: '' }]
    });
    setSubmissionStatus(null);
    setCurrentStage(0);
    setSelectedNGO(null);
  };

  // Render status component if submission has happened
  if (submissionStatus) {
    return (
      <DonationStatus 
        formData={formData}
        currentStage={currentStage}
        submissionStatus={submissionStatus}
        selectedNGO={selectedNGO}
        onAcceptRequest={handleAcceptRequest}
        onResetForm={resetForm}
      />
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border-10 border-white">
      {/* Header */}
      <div className="bg-orange-500 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">Create Food Donation Request</h2>
        <p className="text-orange-100 mt-1">Help reduce food waste by donating excess food</p>
      </div>
      
      {/* Form Content */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name*</label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Organization name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Type*</label>
              <select
                name="organizationType"
                value={formData.organizationType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                required
              >
                <option value="College">College</option>
                <option value="Hostel">Hostel</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Catering Service">Catering Service</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              placeholder="Full address"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="City"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Phone number"
                required
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Food Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type of Food*</label>
                <input
                  type="text"
                  name="foodDetails"
                  value={formData.foodDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="e.g., Vegetarian meals, Bread, Fruits"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity*</label>
                <input
                  type="text"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                  placeholder="e.g., 50 plates, 10 kg"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Best Before*</label>
              <input
                type="date"
                name="bestBefore"
                value={formData.bestBefore}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                required
              />
            </div>

            <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">Detailed Inventory (Optional)</h3>
                <button
                  type="button"
                  onClick={addInventoryRow}
                  className="text-orange-500 hover:text-orange-700 text-sm font-medium flex items-center"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Add Item
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {formData.inventory.map((row, index) => (
                  <div key={index} className="p-4 flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Item</label>
                      <input
                        type="text"
                        value={row.item}
                        onChange={(e) => handleInventoryChange(index, 'item', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Item name"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-500 mb-1">Quantity</label>
                      <input
                        type="text"
                        value={row.quantity}
                        onChange={(e) => handleInventoryChange(index, 'quantity', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Quantity"
                      />
                    </div>
                    <div className="pt-5">
                      {formData.inventory.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeInventoryRow(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodDonationForm;