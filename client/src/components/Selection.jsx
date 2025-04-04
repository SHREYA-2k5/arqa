import React from 'react';
import { IconLock, IconClock, IconArrowRight, IconChecklist } from '@tabler/icons-react';

const Selection = ({
  mealsBySlot,
  selections,
  activeTab,
  setActiveTab,
  handleOptInChange,
  handlePortionChange,
  handleSubmit,
  handleNotesChange,
  cutoffTimes 
}) => {
  const isSlotLocked = (slot) => {
    const now = new Date();
    const [time, period] = cutoffTimes[slot].split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let cutoff = new Date();
    if(slot === 'breakfast' && period.includes('previous')) {
      cutoff.setDate(cutoff.getDate() - 1);
    }
    cutoff.setHours(hours, minutes, 0, 0);
    return now > cutoff;
  };
  
  const handleSelectAll = () => {
    mealsBySlot[activeTab].forEach(item => {
      if(!isSlotLocked(activeTab)) {
        handleOptInChange(item.id);
      }
    });
  };

  return (
    <div className="w-2/3 overflow-y-auto p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Meal Pre-Booking</h1>
          <div className="flex items-center justify-center gap-2 text-blue-600">
            <IconClock size={20} />
            <p className="text-sm font-medium">
              {isSlotLocked(activeTab) ? 
                'Changes locked for this meal' : 
                `Open until ${cutoffTimes[activeTab]}`
              }
            </p>
          </div>
        </header>

        <div className="bg-[#F8F2EF] rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            {Object.keys(mealsBySlot).map(slot => {
              const locked = isSlotLocked(slot);
              return (
                <button
                  key={slot}
                  className={`flex-1 px-6 py-4 font-medium text-lg capitalize transition-all duration-300 
                    flex items-center justify-center gap-2
                    ${activeTab === slot 
                      ? 'bg-[#e65f2b] text-white shadow-inner' 
                      : locked 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'}`}
                  onClick={() => !locked && setActiveTab(slot)}
                  disabled={locked}
                >
                  {slot}
                  {locked && <IconLock size={18} />}
                </button>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 capitalize">{activeTab} Options</h2>
              {!isSlotLocked(activeTab) && (
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <IconChecklist size={20} />
                  Select All {activeTab} Items
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mealsBySlot[activeTab].map(item => {
                const locked = isSlotLocked(activeTab);
                const maxPortions = item.maxPortions || 3; // Add maxPortions to your menu items

                return (
                  <div 
                    key={item.id} 
                    className={`p-6 border rounded-xl transition-all duration-200 relative
                      ${selections[item.id].optedIn 
                        ? 'ring-2 ring-blue-500 bg-blue-50 border-transparent' 
                        : 'border-gray-100 hover:shadow-md hover:border-blue-100'}
                      ${locked ? 'opacity-75 pointer-events-none' : ''}`}
                  >
                    {locked && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
                        <IconLock size={24} className="text-red-500" />
                      </div>
                    )}

                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-xl text-gray-800">{item.item}</h3>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full 
                            ${item.veg 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'}`}>
                            {item.veg ? 'Vegetarian' : 'Non-Vegetarian'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{item.desc}</p>
                        
                        {selections[item.id].optedIn && (
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <label className="mr-3 text-gray-700 font-medium">Portions:</label>
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handlePortionChange(item.id, selections[item.id].portion - 1)}
                                  disabled={selections[item.id].portion <= 1}
                                  className="px-3 py-1 bg-gray-100 rounded-lg disabled:opacity-40 hover:bg-gray-200 transition-colors
                                    text-gray-700 font-medium"
                                  aria-label={`Decrease portions for ${item.item}`}
                                >
                                  −
                                </button>
                                <span className="w-10 text-center text-lg font-medium text-gray-800">
                                  {selections[item.id].portion}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handlePortionChange(item.id, selections[item.id].portion + 1)}
                                  disabled={selections[item.id].portion >= maxPortions}
                                  className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors
                                    text-gray-700 font-medium disabled:opacity-40"
                                  aria-label={`Increase portions for ${item.item}`}
                                >
                                  +
                                </button>
                              </div>
                              <span className="ml-3 text-sm text-gray-500">
                                (Max {maxPortions})
                              </span>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Special Requests:
                              </label>
                              <textarea
                                value={selections[item.id].notes}
                                onChange={(e) => handleNotesChange(item.id, e.target.value)}
                                className="w-full p-2 border rounded-lg text-sm"
                                placeholder="Allergies, preferences..."
                                rows={2}
                                maxLength={100}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selections[item.id].optedIn}
                          onChange={() => handleOptInChange(item.id)}
                          className="sr-only peer"
                          disabled={locked}
                          aria-label={`Toggle ${item.item} selection`}
                        />
                        <div className="relative w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                          after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                          after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                          peer-checked:bg-blue-600">
                        </div>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center gap-4">
              <button
                type="submit"
                disabled={isSlotLocked(activeTab)}
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 
                  text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300
                  transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                  disabled:opacity-75 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                Confirm Meal Preferences
                <IconArrowRight className="ml-2 inline-block" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Selection;