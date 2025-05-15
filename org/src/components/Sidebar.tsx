// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaLayerGroup,
  FaParking,
  FaChartBar,
  FaBars,
  FaChevronLeft,
} from 'react-icons/fa';

const navItems = [
  { to: '/dashboard/levels', label: 'Manage Levels', icon: <FaLayerGroup /> },
  { to: '/dashboard/slots',  label: 'Manage Slots',  icon: <FaParking />     },
  { to: '/dashboard/analytics', label: 'Analytics',    icon: <FaChartBar />    },
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`
        sticky top-0 h-screen flex flex-col transition-width duration-300
        ${collapsed ? 'w-20' : 'w-64'}
        bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600
        text-white overflow-hidden
      `}
    >
      {/* background blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full animate-pulse-slow bg-gradient-to-tr from-blue-400 to-purple-500 opacity-50 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full animate-pulse-slow bg-gradient-to-br from-indigo-400 to-blue-300 opacity-50 animate-pulse delay-2000"></div>

      {/* collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="z-10 self-end m-4 p-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full hover:bg-opacity-40 transition"
      >
        {collapsed ? <FaBars size={20} /> : <FaChevronLeft size={20} />}
      </button>

      {/* logo/title */}
      <div className="z-10 flex items-center space-x-2 p-4">
        <span className="text-2xl font-bold select-none">
          {collapsed ? 'P+' : 'Parking Plus'}
        </span>
      </div>

      {/* nav */}
      <nav className="z-10 flex-1 mt-4 overflow-y-auto">
        {navItems.map(item => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`
                flex items-center gap-3 p-3 mx-2 my-1 rounded-lg transition
                                      /* force white text/icons */
                ${isActive
                                  ? 'bg-white bg-opacity-25 shadow-inner text-blue-500'
                               : 'text-white hover:text-blue-500 hover:bg-white hover:bg-opacity-10'}
                               `}
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* footer */}
      <div className="z-10 p-4 text-center text-sm opacity-80">
        {!collapsed && <>© {new Date().getFullYear()} Parking+</>}
      </div>
    </aside>
  );
};

export default Sidebar;
