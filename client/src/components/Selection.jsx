import React, { useState, useEffect } from 'react';
import { IconLock, IconClock, IconArrowRight, IconChecklist } from '@tabler/icons-react';

const Selection = ({
  activeTab,
  setActiveTab,
  cutoffTimes,
  onSubmit,
  menuItems,
  selections,
  setSelections,
  isLoading
}) => {

  const mealsBySlot = {
    breakfast: menuItems.filter(item => item.slot === 'breakfast'),
    lunch: menuItems.filter(item => item.slot === 'lunch'),
    snack: menuItems.filter(item => item.slot === 'snack'),
    dinner: menuItems.filter(item => item.slot === 'dinner')
  };

  const isSlotLocked = (slot) => {
    const now = new Date();
    const cutoffHHMM = cutoffTimes[slot];
    const hours = Math.floor(cutoffHHMM / 100);
    const minutes = cutoffHHMM % 100;
    const cutoff = new Date();
    cutoff.setHours(hours, minutes, 0, 0);
    return now > cutoff;
  };

  const handleOptInChange = (itemId) => {
    setSelections(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        optedIn: !prev[itemId].optedIn,
        portion: !prev[itemId].optedIn ? 1 : 0,
      },
    }));
  };

  const handlePortionChange = (itemId, value) => {
    if (value < 0) return;
    setSelections(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        portion: value,
      },
    }));
  };

  const handleNotesChange = (itemId, notes) => {
    setSelections(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        notes,
      },
    }));
  };

  const handleSelectAll = () => {
    if (!isSlotLocked(activeTab)) {
      const newSelections = { ...selections };
      mealsBySlot[activeTab].forEach(item => {
        newSelections[item.id] = {
          ...newSelections[item.id],
          optedIn: true,
          portion: 1
        };
      });
      setSelections(newSelections);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedItems = Object.entries(selections)
      .filter(([_, selection]) => selection.optedIn && selection.portion > 0)
      .map(([itemId, selection]) => ({
        itemId,
        portions: selection.portion
      }));
    onSubmit(selectedItems);
  };

  if (isLoading) {
    return (
      <div className="w-2/3 overflow-y-auto p-8 flex items-center justify-center">
        <div className="text-xl">Loading menu options...</div>
      </div>
    );
  }

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
                        : 'text-gray-600 hover:bg-[#FFE9E0] hover:text-[#000000]'}`}
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
                  className="flex items-center gap-2 text-[#000] hover:text-[#e65f2b] font-medium"
                >
                  <IconChecklist size={20} />
                  Select All {activeTab} Items
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mealsBySlot[activeTab].map(item => {
                const locked = isSlotLocked(activeTab);
                const maxPortions = 3;
                const itemSelection = selections[item.id] || { optedIn: false, portion: 0, notes: '' };

                return (
                  <div 
                    key={item.id} 
                    className={`p-6 border rounded-xl transition-all duration-200 relative
                      ${itemSelection.optedIn 
                        ? 'ring-2 ring-[#e65f2b] bg-[#FFE9E0] border-transparent' 
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
                        
                        {itemSelection.optedIn && (
                          <div className="space-y-4">
                            <div className="flex items-center">
                              <label className="mr-3 text-gray-700 font-medium">Portions:</label>
                              <div className="flex items-center space-x-2">
                                <button
                                  type="button"
                                  onClick={() => handlePortionChange(item.id, itemSelection.portion - 1)}
                                  disabled={itemSelection.portion <= 1}
                                  className="px-3 py-1 bg-gray-100 rounded-lg disabled:opacity-40 hover:bg-gray-200 transition-colors
                                    text-gray-700 font-medium"
                                  aria-label={`Decrease portions for ${item.item}`}
                                >
                                  −
                                </button>
                                <span className="w-10 text-center text-lg font-medium text-gray-800">
                                  {itemSelection.portion}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handlePortionChange(item.id, itemSelection.portion + 1)}
                                  disabled={itemSelection.portion >= maxPortions}
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
                                value={itemSelection.notes}
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
                          checked={itemSelection.optedIn}
                          onChange={() => handleOptInChange(item.id)}
                          className="sr-only peer"
                          disabled={locked}
                          aria-label={`Toggle ${item.item} selection`}
                        />
                        <div className="relative w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                          peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                          after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                          after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                          peer-checked:bg-[#e65f2b]">
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
                className="px-12 py-4 bg-gradient-to-r from-[#e65f2b] to-[#f08c54] hover:from-[#f08c54] hover:to-[#e65f2b] 
                text-white font-semibold text-lg rounded-xl shadow-lg transition-all duration-300
                transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#f08c54] focus:ring-offset-2
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