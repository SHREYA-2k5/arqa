import { 
    PopularityChart, 
    SlotDistributionChart, 
    IngredientChart 
  } from './DashCharts';
  
  // Dashboard Page
  export const DashboardPage = ({ bookingStats, popularityData, slotDistributionData, timeRange, setTimeRange, mostPopular, leastPopular}) => (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="mb-6">
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="p-2 border rounded-md shadow-sm"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>
  
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#F8F2EF] p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#060606]">Total Bookings</h3>
          <p className="text-3xl font-bold">
            {bookingStats.reduce((sum, item) => sum + item.bookings, 0)}
          </p>
        </div>
        <div className="bg-[#F8F2EF] p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#060606]">Most Popular</h3>
          <p className="text-2xl font-bold">{mostPopular.item || 'N/A'}</p>
          <p className="text-gray-600">{mostPopular.bookings || 0} orders</p>
        </div>
        <div className="bg-[#F8F2EF] p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-[#060606]">Least Popular</h3>
          <p className="text-2xl font-bold">{leastPopular.item || 'N/A'}</p>
          <p className="text-gray-600">{leastPopular.bookings || 0} orders</p>
        </div>
      </div>
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#F8F2EF] p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Food Item Popularity</h3>
          <div className="h-80">
            <PopularityChart data={popularityData} />
          </div>
        </div>
        <div className="bg-[#F8F2EF] p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Meal Slot Distribution</h3>
          <div className="h-80">
            <SlotDistributionChart data={slotDistributionData} />
          </div>
        </div>
      </div>
    </>
  );
  
  // Menu Management Page
  export const MenuPage = ({ bookingStats }) => (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Menu Management</h1>
      <div className="bg-[#F8F2EF] p-6 rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-[#F8F2ZA]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-[#F8F2EF] divide-y divide-gray-200">
          {bookingStats.map((item) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap">{item.item}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.slot}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.veg ? 'Vegetarian' : 'Non-Veg'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.bookings}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </>
  );
  
  // Ingredients Page
  export const IngredientsPage = ({ ingredientData, ingredientRequirements }) => (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Ingredient Requirements</h1>
      <div className="bg-[#F8F2EF] p-4 rounded-lg shadow mb-8">
        <div className="h-80">
          <IngredientChart data={ingredientData} />
        </div>
      </div>
      {/* Shopping List */}
      <div className="bg-[#F8F2EF] p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Shopping List</h3>
        <div className="grid grid-cols-2 gap-6">
          {Object.entries(ingredientRequirements).map(([ingredient, quantity]) => (
            <div key={ingredient} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="font-medium text-gray-700 capitalize">
                  {ingredient.replace(/_/g, ' ')}
                </span>
              </div>
              <span className="bg-white px-3 py-1 rounded-full text-sm font-medium shadow-xs border border-gray-200">
                {quantity} {quantity !== 1 ? 'kg' : 'kg'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
  
  // Reports Page
  export const ReportsPage = ({ leastPopular, mostPopular, bookingStats }) => (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>
      <div className="bg-[#F8F2EF] p-6 rounded-lg shadow">
        {/* Report content */}
        <h3 className="text-xl font-semibold mb-4">Purchasing Recommendations</h3>
        <ul className="space-y-3">
          <li className="p-3 bg-blue-50 rounded-md">
            <strong>Increase promotion for {leastPopular.item || 'least popular item'}</strong> - Only {leastPopular.bookings || 0} orders last week. Consider revising recipe or presentation.
          </li>
          <li className="p-3 bg-green-50 rounded-md">
            <strong>Stock up for {mostPopular.item || 'most popular item'}</strong> - Needs ingredients for {mostPopular.bookings || 0} servings weekly. Prioritize these purchases.
          </li>
          <li className="p-3 bg-yellow-50 rounded-md">
            <strong>Vegetarian focus:</strong> {bookingStats.filter(item => item.veg).length} of {bookingStats.length} items are vegetarian. Consider adding more veg options for dinner.
          </li>
        </ul>
      </div>
    </>
  );