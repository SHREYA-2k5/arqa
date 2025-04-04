import React, { useState } from 'react';
import MealSelection from '../components/Selection';
import BookingSummary from '../components/Summary';
import { menuItems } from './tempdata';


const BookingPage = () => {
    const [cutoffTimes] = useState({
      breakfast: "20:00 (previous)",
      lunch: "20:00",
      snack: "19:00 ", 
      dinner: "20:00"
    });
    
    const mealsBySlot = {
      breakfast: menuItems.filter(item => item.slot === 'breakfast'),
      lunch: menuItems.filter(item => item.slot === 'lunch'),
      snack: menuItems.filter(item => item.slot === 'snack'),
      dinner: menuItems.filter(item => item.slot === 'dinner')
    };
  
    const [selections, setSelections] = useState(() => {
      const initialSelections = {};
      menuItems.forEach(item => {
        initialSelections[item.id] = {
          optedIn: true,
          portion: 1,
          notes: ''
        };
      });
      return initialSelections;
    });
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('breakfast');
  
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Submitting:', { selections });
      setSubmitted(true);
    };
  
    if (submitted) {
      return (
        <div className="max-w-4xl mx-auto p-8 bg-[#EBDFD7] rounded-xl shadow-lg mt-10">
          <h2 className="text-3xl font-bold text-green-700 mb-4">Thank You!</h2>
          <p className="text-gray-700 text-lg mb-6">Your meal preferences have been successfully recorded.</p>
          
          <div className="bg-[#F8F2EF] p-6 rounded-lg shadow-sm mb-6">
            <h3 className="text-xl font-semibold mb-4">Your Selections:</h3>
            {Object.entries(selections)
              .filter(([_, selection]) => selection.optedIn && selection.portion > 0)
              .map(([itemId, selection]) => {
                const item = menuItems.find(i => i.id === itemId);
                return (
                  <div key={itemId} className="mb-3 pb-3 border-b last:border-b-0">
                    <p className="font-medium">{item.item} ({item.slot})</p>
                    <p className="text-gray-600">Portions: {selection.portion}</p>
                    {selection.notes && <p className="text-gray-600">Notes: {selection.notes}</p>}
                  </div>
                );
              })}
          </div>
          
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg"
          >
            Edit Preferences
          </button>
        </div>
      );
    }
  
    return (
      <div className="w-screen h-screen flex overflow-hidden bg-[#EBDFD7]">
        <MealSelection
          mealsBySlot={mealsBySlot}
          selections={selections}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleOptInChange={handleOptInChange}
          handlePortionChange={handlePortionChange}
          handleSubmit={handleSubmit}
          handleNotesChange={handleNotesChange}
          cutoffTimes={cutoffTimes}
        />
        <BookingSummary
          mealsBySlot={mealsBySlot}
          selections={selections}
        />
      </div>
    );
  };
  
  export default BookingPage;