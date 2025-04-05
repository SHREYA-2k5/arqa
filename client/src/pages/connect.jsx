import React, { useState } from "react";

const Connect = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inventory: [{ item: '', quantity: '' }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          organization: '',
          inventory: [{ item: '', quantity: '' }]
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-r from-orange-100 to-orange-200">
      <div className="space-y-6 w-full max-w-2xl bg-white p-8 rounded-xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Connect with Us</h2>
        
        {isSuccess ? (
          <div className="text-center py-8 animate-bounce">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-800">Request Submitted!</h3>
            <p className="text-gray-600 mt-2">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <label className="block">
                <span className="text-gray-700 font-medium">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="Enter your name"
                  required
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </label>
            </div>

            <label className="block mt-6">
              <span className="text-gray-700 font-medium">Organization</span>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                placeholder="Enter your organization"
                required
              />
            </label>

            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Inventory Details</span>
                <button
                  type="button"
                  onClick={addInventoryRow}
                  className="text-orange-500 hover:text-orange-700 font-medium text-sm"
                >
                  + Add Item
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.inventory.map((row, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input
                            type="text"
                            value={row.item}
                            onChange={(e) => handleInventoryChange(index, 'item', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Item name"
                            required
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <input
                            type="text"
                            value={row.quantity}
                            onChange={(e) => handleInventoryChange(index, 'quantity', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                            placeholder="Quantity"
                            required
                          />
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          {formData.inventory.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeInventoryRow(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-6 w-full bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 hover:shadow-md transition-all duration-300 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Create Request'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Connect;