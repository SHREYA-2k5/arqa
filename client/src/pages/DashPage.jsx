import { useState, useEffect } from 'react';
import { Sidebar } from '../components/DashSidebar';
import { DashboardPage, IngredientsPage} from '../components/DashSections';
import { MenuPage } from '../components/UpdateMenuSection';
import { ReportSection } from '../components/ReportSection';
import { dummyBookingData } from './tempdata';
import Connect from './connect';

const useDashboardData = () => {
  const [bookingStats, setBookingStats] = useState([]);
  const [ingredientRequirements, setIngredientRequirements] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        console.log("Getting some of that dashboard data");
        const response = await fetch('http://localhost:8080/api/menu/'); 
        const data = await response.json();
        console.log("Data has been recieved!!");
        
        if (data && data.length > 0) {
          setBookingStats(data);
          
          const ingredients = {};
          data.forEach(item => {
            Object.entries(item.ingredients).forEach(([ingredient, quantity]) => {
              ingredients[ingredient] = (ingredients[ingredient] || 0) + quantity;
            });
          });
          setIngredientRequirements(ingredients);
        } else {
          // Fallback to dummy data if API returns empty
          console.warn('No data received from API, using fallback data');
          setBookingStats(dummyBookingData);
          
          const ingredients = {};
          dummyBookingData.forEach(item => {
            Object.entries(item.ingredients).forEach(([ingredient, quantity]) => {
              ingredients[ingredient] = (ingredients[ingredient] || 0) + quantity;
            });
          });
          setIngredientRequirements(ingredients);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        // Fallback to dummy data on error
        setBookingStats(dummyBookingData);
        
        const ingredients = {};
        dummyBookingData.forEach(item => {
          Object.entries(item.ingredients).forEach(([ingredient, quantity]) => {
            ingredients[ingredient] = (ingredients[ingredient] || 0) + quantity;
          });
        });
        setIngredientRequirements(ingredients);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { bookingStats, ingredientRequirements, isLoading, error };
};

const useChartData = (bookingStats, ingredientRequirements) => {
  const mostPopular = bookingStats.reduce((prev, current) => 
    (prev.bookings > current.bookings) ? prev : current, { bookings: 0 });
  
  const leastPopular = bookingStats.reduce((prev, current) => 
    (prev.bookings < current.bookings) ? prev : current, { bookings: Infinity });

  // Updated chart colors to match orange theme
  const popularityData = {
    labels: bookingStats.map(item => item.item),
    datasets: [{
      label: 'Number of Orders',
      data: bookingStats.map(item => item.bookings),
      backgroundColor: 'rgba(249, 115, 22, 0.5)',  // orange-500 with opacity
      borderColor: 'rgba(249, 115, 22, 1)',        // orange-500
      borderWidth: 1
    }]
  };

  const slotDistributionData = {
    labels: ['Breakfast', 'Lunch', 'Snack', 'Dinner'],
    datasets: [{
      data: [
        bookingStats.filter(item => item.slot === 'breakfast').length,
        bookingStats.filter(item => item.slot === 'lunch').length,
        bookingStats.filter(item => item.slot === 'snack').length,
        bookingStats.filter(item => item.slot === 'dinner').length
      ],
      backgroundColor: [
        'rgba(249, 115, 22, 0.8)',  // orange-500 primary
        'rgba(249, 115, 22, 0.6)',  // orange-500 lighter
        'rgba(249, 115, 22, 0.4)',  // orange-500 even lighter
        'rgba(249, 115, 22, 0.2)'   // orange-500 lightest
      ],
      borderColor: [
        'rgba(249, 115, 22, 1)',    // orange-500
        'rgba(249, 115, 22, 0.8)',  // orange-500 slightly transparent
        'rgba(249, 115, 22, 0.6)',  // orange-500 more transparent
        'rgba(249, 115, 22, 0.4)'   // orange-500 most transparent
      ],
      borderWidth: 1
    }]
  };

  const ingredientData = {
    labels: Object.keys(ingredientRequirements),
    datasets: [{
      label: 'Required Quantity (kg/liters)',
      data: Object.values(ingredientRequirements),
      backgroundColor: 'rgba(249, 115, 22, 0.5)',  // orange-500 with opacity
      borderColor: 'rgba(249, 115, 22, 1)',        // orange-500
      borderWidth: 1
    }]
  };

  return { mostPopular, leastPopular, popularityData, slotDistributionData, ingredientData };
};

const DashPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { bookingStats, ingredientRequirements, isLoading, error } = useDashboardData();
  const { 
    mostPopular, 
    leastPopular, 
    popularityData, 
    slotDistributionData, 
    ingredientData 
  } = useChartData(bookingStats, ingredientRequirements);

  return (
    <div className="flex h-screen w-screen bg-orange-50">
      {/* Main layout */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-orange-800">Dashboard</h1>
              <div>
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                >
                  {sidebarOpen ? '←' : '→'}
                </button>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-2"></div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow-md">
              <div className="flex space-x-2">
                <span className="w-4 h-4 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-4 h-4 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-4 h-4 bg-orange-500 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-l-4 border-orange-500 text-orange-700 p-4 mb-6 rounded shadow-md" role="alert">
              <p className="font-bold">Error Loading Data</p>
              <p>Showing fallback data: {error}</p>
            </div>
          )}

          {/* Dashboard Content */}
          {!isLoading && activeTab === 'dashboard' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-orange-100">
              <DashboardPage 
                bookingStats={bookingStats}
                popularityData={popularityData}
                slotDistributionData={slotDistributionData}
                timeRange={timeRange}
                setTimeRange={setTimeRange}
                mostPopular={mostPopular}
                leastPopular={leastPopular}
              />
            </div>
          )}

          {/* Menu Page */}
          {!isLoading && activeTab === 'menu' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-orange-100">
              <MenuPage bookingStats={bookingStats} />
            </div>
          )}
          
          {/* Ingredients Page */}
          {!isLoading && activeTab === 'ingredients' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-orange-100">
              <IngredientsPage 
                ingredientData={ingredientData}
                ingredientRequirements={ingredientRequirements}
              />
            </div>
          )}
          
          {/* Reports Section */}
          {!isLoading && activeTab === 'reports' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-orange-100">
              <ReportSection />
            </div>
          )}
          
          {/* Donate Section */}
          {!isLoading && activeTab === 'donate' && (
            <div className="flex justify-center">
              <Connect/>
            </div>
          )}
          
          {/* Footer */}
          <div className="text-center text-sm text-orange-400 mt-6">
            <p>© 2025 Dashboard • All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashPage;