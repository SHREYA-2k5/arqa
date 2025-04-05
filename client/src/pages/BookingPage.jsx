import React, { useState, useEffect } from 'react';
import MealSelection from '../components/Selection';
import BookingSummary from '../components/Summary';
import { menuItems as defaultMenuItems } from './tempdata';

// 👇 Pulse Loader Component
const PulseLoader = () => {
    return (
        <div className="flex space-x-2 items-center justify-center mt-6">
            <span className="w-3 h-3 bg-[#e65f2b] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-3 h-3 bg-[#e65f2b] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-3 h-3 bg-[#e65f2b] rounded-full animate-bounce"></span>
        </div>
    );
};

const BookingPage = () => {
    const [cutoffTimes] = useState({
        breakfast: 5000,
        lunch: 1100,
        snack: 1800,
        dinner: 2350
    });
    const [menuItems, setMenuItems] = useState([]);
    const [selections, setSelections] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('breakfast');

    const mealsBySlot = {
        breakfast: menuItems.filter(item => item.slot === 'breakfast'),
        lunch: menuItems.filter(item => item.slot === 'lunch'),
        snack: menuItems.filter(item => item.slot === 'snack'),
        dinner: menuItems.filter(item => item.slot === 'dinner')
    };

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/menu');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                setMenuItems(data);
                initializeSelections(data);
            } catch (error) {
                console.error('Error fetching menu:', error);
                setError(error.message);
                // Fall back to default data
                setMenuItems(defaultMenuItems);
                initializeSelections(defaultMenuItems);
            } finally {
                setIsLoading(false);
            }
        };

        const initializeSelections = (items) => {
            const initialSelections = {};
            items.forEach(item => {
                initialSelections[item.id] = {
                    optedIn: true,
                    portion: 1,
                    notes: ''
                };
            });
            setSelections(initialSelections);
        };

        fetchMenuData();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const selectedItems = Object.entries(selections)
                .filter(([id, selection]) =>
                    selection.optedIn &&
                    selection.portion > 0 &&
                    menuItems.some(item => item.id === id)
                )
                .map(([itemId, selection]) => ({
                    itemId,
                    portions: selection.portion
                }));

            const response = await fetch('http://localhost:8080/api/menu/book', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: selectedItems }),
            });

            if (!response.ok) throw new Error('Failed to update meal bookings');
            setSubmitted(true);
        } catch (error) {
            console.error('Booking failed:', error);
            alert('Failed to submit booking. Please try again.');
        }
    };

    // 👇 Loader view
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#EBDFD7]">
                <PulseLoader />
                <div className="text-lg mt-4 text-[#e65f2b]">Loading menu options...</div>
            </div>
        );
    }

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
                            return item ? (
                                <div key={itemId} className="mb-3 pb-3 border-b last:border-b-0">
                                    <p className="font-medium">{item.item} ({item.slot})</p>
                                    <p className="text-gray-600">Portions: {selection.portion}</p>
                                    {selection.notes && <p className="text-gray-600">Notes: {selection.notes}</p>}
                                </div>
                            ) : null;
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
                menuItems={menuItems}
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