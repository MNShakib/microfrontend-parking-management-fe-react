import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('userTheme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    localStorage.setItem('userTheme', darkMode ? 'dark' : 'light');
    document.body.className = darkMode ? 'bg-[#070F2B] text-white' : 'bg-[#F8FAFC] text-black';
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const navItems = [
    {
      path: '/dashboard/profile',
      icon: '',
      label: 'Profile',
      lightBg: 'bg-[#9AA6B2]',
      darkBg: 'bg-[#070F2B]',
    },
    {
      path: '/dashboard/book',
      icon: '',
      label: 'Book',
      lightBg: 'bg-[#9AA6B2]',
      darkBg: 'bg-[#070F2B]',
    },
    {
      path: '/dashboard/wallet',
      icon: '',
      label: 'Wallet',
      lightBg: 'bg-[#9AA6B2]',
      darkBg: 'bg-[#070F2B]',
    },
    {
      path: '/dashboard/history',
      icon: '',
      label: 'History',
      lightBg: 'bg-[#9AA6B2]',
      darkBg: 'bg-[#070F2B]',
    },
  ];

  return (
    <div
      className={`h-screen fixed top-0 left-0 transition-all duration-300 shadow-lg z-50 ${
        collapsed ? 'w-[60px]' : 'w-[220px]'
      } ${darkMode ? 'bg-[#1B1A55] text-white' : 'bg-[#D9EAFD] text-black'}`}
    >
      {/* Collapse Button */}
      <div className="flex justify-end p-3">
        <button onClick={() => setCollapsed(!collapsed)} title="Toggle Sidebar">
          ☰
        </button>
      </div>

      {/* Brand */}
      <div className="text-center font-bold text-lg mb-6">
        {collapsed ? '🚗' : '🚗 Parking App'}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center md:items-start gap-4 px-2">
        {navItems.map(({ path, icon, label, lightBg, darkBg }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded transition-transform hover:scale-105 ${
              collapsed ? 'justify-center' : ''
            } ${darkMode ? `${darkBg} hover:brightness-110` : `${lightBg} hover:brightness-105`}`}
            title={label}
          >
            <span className="text-xl">{icon}</span>
            {!collapsed && <span className="text-base">{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Theme Toggle */}
      <div className="flex justify-center p-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-md text-sm font-medium transition-colors ${
            darkMode ? 'bg-[#9290C3] text-black' : 'bg-[#BCCCDC] text-black'
          }`}
        >
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
