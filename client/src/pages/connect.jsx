import React, { useState } from "react";

const Connect = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inventory: [{ item: '', quantity: '' }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); // null | 'created' | 'accepted' | 'completed'
  const [currentStage, setCurrentStage] = useState(0); // 0, 1, or 2

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
    }));
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

  const simulateAdminApproval = () => {
    // Simulate admin approving the request stages
    const stages = ['created', 'accepted', 'completed'];
    let stageIndex = 0;
    
    const interval = setInterval(() => {
      setCurrentStage(stageIndex);
      setSubmissionStatus(stages[stageIndex]);
      
      if (stageIndex === stages.length - 1) {
        clearInterval(interval);
      }
      stageIndex++;
    }, 2000); // Change stage every 2 seconds
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('created');
    setCurrentStage(0);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      
      // Start simulating the approval process
      simulateAdminApproval();
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      organization: '',
      inventory: [{ item: '', quantity: '' }]
    });
    setSubmissionStatus(null);
    setCurrentStage(0);
  };

  const statusStages = [
    { id: 'created', label: 'Request Created', description: 'Your request has been successfully submitted.' },
    { id: 'accepted', label: 'Request Accepted', description: 'Your request has been reviewed and accepted.' },
    { id: 'completed', label: 'Completed - Good Cause Approved', description: 'Admin has approved your request as a good cause.' }
  ];

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden border-10 border-white">
        {/* Header */}
        <div className="bg-orange-500 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Create Request</h2>
          <p className="text-orange-100 mt-1">Fill out the form to create the request.</p>
        </div>
        
        {/* Form Content */}
        <div className="p-8">
          {submissionStatus ? (
            <div className="space-y-6">
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
                        {index + 1}
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
              </div>

              {/* Show form data for reference */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Request Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
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
                </div>
                
                <div className="mt-4">
                  <p className="text-xs text-gray-500 mb-2">Inventory Items</p>
                  <div className="space-y-2">
                    {formData.inventory.map((item, index) => (
                      <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-800">{item.item}</span>
                        <span className="text-gray-600">{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {currentStage === statusStages.length - 1 && (
                <button
                  onClick={resetForm}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Create New Request
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
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

              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">Inventory Details</h3>
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
                          required
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
                          required
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
                      Processing...
                    </span>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;