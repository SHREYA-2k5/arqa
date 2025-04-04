import React from 'react';

const BookingSummary = ({ mealsBySlot, selections }) => {
  return (
    <div className="w-1/3 bg-[#F8F2EF] border-l border-gray-200 overflow-y-auto p-8">
      <div className="sticky top-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-200">Booking Summary</h2>
        
        <div className="space-y-6">
          {Object.entries(mealsBySlot).map(([slot, items]) => {
            const selectedCount = items.filter(item => selections[item.id].optedIn).length;
            return (
              <div key={slot} className="bg-gray-50 p-5 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg capitalize text-gray-700">{slot}</h3>
                  <span className={`px-3 py-1 text-sm rounded-full 
                    ${selectedCount > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                    {selectedCount}/{items.length} selected
                  </span>
                </div>
                
                {selectedCount > 0 && (
                  <ul className="space-y-2 mt-3">
                    {items.filter(item => selections[item.id].optedIn).map(item => (
                      <li key={item.id} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg">
                        <span className="font-medium text-gray-700">{item.item}</span>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full">
                          {selections[item.id].portion} {selections[item.id].portion === 1 ? 'portion' : 'portions'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-xl">
          <h3 className="font-semibold text-lg mb-4 text-gray-800">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Items:</span>
              <span className="font-medium">
                {Object.values(selections).filter(s => s.optedIn).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Portions:</span>
              <span className="font-medium">
                {Object.entries(selections).reduce((sum, [id, sel]) => sum + (sel.optedIn ? sel.portion : 0), 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;