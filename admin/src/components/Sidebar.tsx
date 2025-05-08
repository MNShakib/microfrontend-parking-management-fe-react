import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  return (
    <aside className={`sidebar ${open ? 'open' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={() => setOpen(!open)}>
        {open ? '⏴' : '⏵'}
      </button>
      <h2 className="sidebar-title">{open ? 'Admin Panel' : 'A'}</h2>
      <nav className="sidebar-links">
        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
          📄 {open && 'Organizations'}
        </Link>
        <Link to="/dashboard/add" className={location.pathname.includes('/add') ? 'active' : ''}>
          ➕ {open && 'Add Organization'}
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
