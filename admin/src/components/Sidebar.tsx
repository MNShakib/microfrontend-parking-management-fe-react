import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light');

  useEffect(() => {
    const updateTheme = () => {
      const updatedTheme = localStorage.getItem('adminTheme') || 'light';
      setTheme(updatedTheme);
    };

    window.addEventListener('storage', updateTheme);
    window.addEventListener('themeChanged', updateTheme);

    updateTheme();

    return () => {
      window.removeEventListener('storage', updateTheme);
      window.removeEventListener('themeChanged', updateTheme);
    };
  }, []);

  const bgColor = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
  const activeLink = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200';

  return (
    <aside
      className={`${
        open ? 'w-64' : 'w-16'
      } h-screen ${bgColor} transition-all duration-300 flex flex-col border-r`}
    >
      <button className="p-2 text-xl" onClick={() => setOpen(!open)}>
        {open ? '⏴⏴' : '⏵'}
      </button>
      <h2 className="text-lg font-semibold p-2">{open ? 'Admin Panel' : 'A'}</h2>
      <nav className="flex flex-col p-2 space-y-2">
        <Link
          to="/dashboard"
          className={`p-2 rounded ${
            location.pathname === '/dashboard' ? activeLink : ''
          }`}
        >
           {open && 'Organizations'}
        </Link>
        <Link
          to="/dashboard/add"
          className={`p-2 rounded ${
            location.pathname.includes('/add') ? activeLink : ''
          }`}
        >
           {open && 'Add Organization'}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
