import { IconCaretLeft, IconCaretRight, IconChartBar, IconToolsKitchen3, IconShoppingCart, IconReport, IconHeartHandshake } from '@tabler/icons-react';
import { useState, useEffect } from 'react';

export const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Define sidebar sections
  const sidebarSections = [
    { id: 'dashboard', icon: <IconChartBar className="text-white" />, label: 'Dashboard' },
    { id: 'menu', icon: <IconToolsKitchen3 className="text-white" />, label: 'Menu Management' },
    { id: 'ingredients', icon: <IconShoppingCart className="text-white" />, label: 'Ingredients' },
    { id: 'reports', icon: <IconReport className="text-white" />, label: 'Reports' },
    { id: 'donate', icon: <IconHeartHandshake className="text-white" />, label: 'Donate' },
  ];
  
  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      const mobileView = window.innerWidth < 780;
      setIsMobile(mobileView);
      
      // Always close traditional sidebar in mobile view
      if (mobileView) {
        setSidebarOpen(false);
      }
    };
    
    // Initial check
    checkScreenSize();
    
    // Add event listener
    window.addEventListener('resize', checkScreenSize);
    
    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [setSidebarOpen]);
  
  // Handle tab selection
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  
  // If mobile, render bottom navigation instead
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#060606] rounded-full shadow-lg mx-4 mb-4">
        <div className="flex items-center justify-around p-3">
          {sidebarSections.map((tab) => (
            <div
              key={tab.id}
              className="flex flex-col items-center p-2 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => handleTabClick(tab.id)}
            >
              <div className={`
                transition-all duration-300 ease-in-out
                ${activeTab === tab.id 
                  ? 'bg-[#e65f2b] p-3 rounded-full -mt-8'
                  : 'p-2'
                }
              `}>
                {tab.icon}
              </div>
              <span className={`
                text-xs mt-1 transition-colors duration-300
                ${activeTab === tab.id ? 'text-white' : 'text-white'}
              `}>
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  // For desktop, render traditional sidebar
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-14'} bg-[#060606] text-[#F1F1F1] transition-all duration-300 flex-shrink-0 h-screen`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h2 className="text-xl font-bold">Mess Management</h2>}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded-lg hover:bg-[#e65f2b] ml-auto transition-colors duration-300"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <IconCaretLeft /> : <IconCaretRight />}
        </button>
      </div>
      
      <nav className="mt-6">
        {sidebarSections.map((tab) => (
          <div
            key={tab.id}
            className={`
              flex items-center p-4 cursor-pointer transition-all duration-300
              ${activeTab === tab.id ? 'bg-[#e65f2b]' : 'hover:bg-[#e65f2b]/70'}
              ${!sidebarOpen ? 'justify-center' : ''}
            `}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className={`${!sidebarOpen ? 'text-lg' : ''}`}>
              {tab.icon}
            </div>
            {sidebarOpen && <span className="ml-4">{tab.label}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
};