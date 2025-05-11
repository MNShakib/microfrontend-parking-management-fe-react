import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        ☰
      </button>
      <div className="nav-brand">{collapsed ? '🚗' : '🚗 Parking'}</div>
      <nav className="nav-links">
        <Link to="/dashboard/profile" title="Profile">
          👤 <span className="link-text">Profile</span>
        </Link>
        <Link to="/dashboard/book" title="Book Slot">
          🅿️ <span className="link-text">Book</span>
        </Link>
        <Link to="/dashboard/wallet" title="Wallet">
          💰 <span className="link-text">Wallet</span>
        </Link>
        <Link to="/dashboard/history" title="History">
          📜 <span className="link-text">History</span>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
