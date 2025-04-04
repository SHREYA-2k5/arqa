import { IconCaretLeft, IconCaretRight, IconChartBar, IconToolsKitchen3, IconShoppingCart, IconReport } from '@tabler/icons-react';

export const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const sidebarSections = [
    { id: 'dashboard', icon: <IconChartBar />, label: 'Dashboard' },
    { id: 'menu', icon: <IconToolsKitchen3 />, label: 'Menu Management' },
    { id: 'ingredients', icon: <IconShoppingCart />, label: 'Ingredients' },
    { id: 'reports', icon: <IconReport />, label: 'Reports' },
  ];

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-14'} bg-[#060606] text-[#F1F1F1] transition-all duration-300 flex-shrink-0`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h2 className="text-xl font-bold">Mess Management</h2>}
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded-lg hover:bg-[#e65f2b]"
        >
          {sidebarOpen ? <IconCaretLeft /> : <IconCaretRight />}
        </button>
      </div>
      <nav className="mt-6">
        {sidebarSections.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center p-4 cursor-pointer ${
              activeTab === tab.id ? 'bg-[#e65f2b]' : 'hover:bg-[#B45E3D]'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            {sidebarOpen && <span className="ml-4">{tab.label}</span>}
          </div>
        ))}
      </nav>
    </div>
  );
};