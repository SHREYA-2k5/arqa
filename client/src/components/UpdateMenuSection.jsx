import { useState } from 'react';

export const MenuPage = ({ bookingStats }) => {
  const [menuItems, setMenuItems] = useState(bookingStats);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [formData, setFormData] = useState({
    item: '',
    desc: '',
    slot: 'breakfast',
    veg: false,
    date: new Date().toISOString().split('T')[0],
    ingredients: {}
  });

  const createMenuItem = async (itemData) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...itemData,
          date: new Date(itemData.date), 
          bookings: 0 
        }),
      });
      const newItem = await response.json();
      setMenuItems([...menuItems, newItem]);
    } catch (error) {
      console.error('Error creating menu item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateMenuItem = async (id, itemData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...itemData,
          date: new Date(itemData.date) 
        }),
      });
      const updatedItem = await response.json();
      setMenuItems(menuItems.map(item => 
        item._id === id ? updatedItem : item
      ));
    } catch (error) {
      console.error('Error updating menu item:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteMenuItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
        return;
    }

    setIsLoading(true);
    setDeleteError(null);
    
    try {
      console.log("Tryingto send this id from client", id);
      
        const response = await fetch(`http://localhost:8080/api/menu/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete item');
        }
        setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
        console.log('Delete successful:', data.message);
    } catch (error) {
        console.error('Delete failed:', error);
        setDeleteError(error.message);
        alert(`Delete failed: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
};

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleIngredientChange = (ingredient, quantity) => {
    setFormData({
      ...formData,
      ingredients: {
        ...formData.ingredients,
        [ingredient]: Number(quantity) || 0
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingItem) {
      await updateMenuItem(editingItem._id, formData);
    } else {
      await createMenuItem(formData);
    }
    setEditingItem(null);
    setFormData({
      item: '',
      desc: '',
      slot: 'breakfast',
      veg: false,
      date: new Date().toISOString().split('T')[0],
      ingredients: {}
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      item: item.item,
      desc: item.desc,
      slot: item.slot,
      veg: item.veg,
      date: new Date(item.date).toISOString().split('T')[0],
      ingredients: { ...item.ingredients }
    });
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Menu Management</h1>
      
      {/* Add/Edit Form */}
      <div className="bg-[#F8F2EF] p-6 rounded-lg shadow-lg mb-6 border border-orange-100">
        <h2 className="text-xl font-semibold mb-4 text-orange-700">
          {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
        </h2>
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                <span>Saving changes...</span>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Item Name*</label>
              <input
                type="text"
                name="item"
                value={formData.item}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 focus:outline-none hover:border-orange-300 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
              <input
                type="text"
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 focus:outline-none hover:border-orange-300 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meal Slot*</label>
              <select
                name="slot"
                value={formData.slot}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 focus:outline-none hover:border-orange-300 transition-colors"
                required
              >
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="snack">Snack</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 focus:outline-none hover:border-orange-300 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="veg"
                  checked={formData.veg}
                  onChange={handleInputChange}
                  className="mr-2 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                />
                <span>Vegetarian</span>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
              <div className="space-y-2">
                {Object.entries(formData.ingredients).map(([ingredient, quantity]) => (
                  <div key={ingredient} className="flex space-x-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => {
                        const newIngredients = {...formData.ingredients};
                        delete newIngredients[ingredient];
                        newIngredients[e.target.value] = quantity;
                        setFormData({...formData, ingredients: newIngredients});
                      }}
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 focus:outline-none hover:border-orange-300 transition-colors"
                      placeholder="Ingredient"
                    />
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleIngredientChange(ingredient, e.target.value)}
                      className="w-24 p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 focus:outline-none hover:border-orange-300 transition-colors"
                      placeholder="Quantity"
                      min="0"
                      step="0.1"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newIngredients = {...formData.ingredients};
                        delete newIngredients[ingredient];
                        setFormData({...formData, ingredients: newIngredients});
                      }}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleIngredientChange('New Ingredient', 1)}
                  className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md hover:bg-orange-200 transition-colors"
                >
                  + Add Ingredient
                </button>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {editingItem ? 'Update Item' : 'Add Item'}
            </button>
            {editingItem && (
              <button
                type="button"
                onClick={() => {
                  setEditingItem(null);
                  setFormData({
                    item: '',
                    desc: '',
                    slot: 'breakfast',
                    veg: false,
                    date: new Date().toISOString().split('T')[0],
                    ingredients: {}
                  });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Menu Items Table */}
      <div className="bg-[#F8F2EF] p-6 rounded-lg shadow-lg overflow-x-auto border border-orange-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Item</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Slot</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Bookings</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#F8F2EF] divide-y divide-gray-200">
            {menuItems.map((item) => (
              <tr key={item.id} className="hover:bg-orange-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap max-w-xs truncate">{item.item}</td>
                <td className="px-4 py-4 whitespace-nowrap max-w-xs truncate">{item.desc}</td>
                <td className="px-4 py-4 whitespace-nowrap capitalize">{item.slot}</td>
                <td className="px-4 py-4 whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-4 py-4 whitespace-nowrap">{item.veg ? 'Vegetarian' : 'Non-Veg'}</td>
                <td className="px-4 py-4 whitespace-nowrap">{item.bookings}</td>
                <td className="px-4 py-4 whitespace-nowrap space-x-2">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-orange-100 text-orange-600 rounded hover:bg-orange-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteMenuItem(item.id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {deleteError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            Error: {deleteError}
        </div>
        )}
      </div>
    </div>
  );
};