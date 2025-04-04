import { useState, useEffect } from 'react';
import { Sidebar } from '../components/DashSidebar';
import { DashboardPage, MenuPage, IngredientsPage, ReportsPage } from '../components/DashSections';
import { dummyBookingData } from './tempdata';

const useDashboardData = () => {
  const [bookingStats, setBookingStats] = useState([]);
  const [ingredientRequirements, setIngredientRequirements] = useState({});

  useEffect(() => {
    setBookingStats(dummyBookingData);
    
    const ingredients = {};
    dummyBookingData.forEach(item => {
      Object.entries(item.ingredients).forEach(([ingredient, quantity]) => {
        ingredients[ingredient] = (ingredients[ingredient] || 0) + quantity;
      });
    });
    setIngredientRequirements(ingredients);
  }, []);

  return { bookingStats, ingredientRequirements };
};

const useChartData = (bookingStats, ingredientRequirements) => {
  const mostPopular = bookingStats.reduce((prev, current) => 
    (prev.bookings > current.bookings) ? prev : current, { bookings: 0 });
  
  const leastPopular = bookingStats.reduce((prev, current) => 
    (prev.bookings < current.bookings) ? prev : current, { bookings: Infinity });

  const popularityData = {
    labels: bookingStats.map(item => item.item),
    datasets: [{
      label: 'Number of Orders',
      data: bookingStats.map(item => item.bookings),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
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
        'rgba(255, 99, 132, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 206, 86, 0.5)',
        'rgba(75, 192, 192, 0.5)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)'
      ],
      borderWidth: 1
    }]
  };

  const ingredientData = {
    labels: Object.keys(ingredientRequirements),
    datasets: [{
      label: 'Required Quantity (kg/liters)',
      data: Object.values(ingredientRequirements),
      backgroundColor: 'rgba(153, 102, 255, 0.5)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }]
  };

  return { mostPopular, leastPopular, popularityData, slotDistributionData, ingredientData };
};

const DashPage = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { bookingStats, ingredientRequirements } = useDashboardData();
  const { 
    mostPopular, 
    leastPopular, 
    popularityData, 
    slotDistributionData, 
    ingredientData 
  } = useChartData(bookingStats, ingredientRequirements);

  return (
    <div className="flex h-screen w-screen bg-[#EBDFD7]">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardPage 
              bookingStats={bookingStats}
              popularityData={popularityData}
              slotDistributionData={slotDistributionData}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              mostPopular={mostPopular}
              leastPopular={leastPopular}
            />
          )}

          {activeTab === 'menu' && <MenuPage bookingStats={bookingStats} />}
          {activeTab === 'ingredients' && (
            <IngredientsPage 
              ingredientData={ingredientData}
              ingredientRequirements={ingredientRequirements}
            />
          )}
          {activeTab === 'reports' && (
            <ReportsPage 
              leastPopular={leastPopular}
              mostPopular={mostPopular}
              bookingStats={bookingStats}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashPage;