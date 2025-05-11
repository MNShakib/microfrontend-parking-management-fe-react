import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Wallet from './Wallet';
import History from './History';
import BookSlot from './BookSlot';
import Navbar from '../components/Navbar';
import '../styles/dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="history" element={<History />} />
        <Route path="book" element={<BookSlot />} />
      </Routes>
    </div>
  );
};

export default Dashboard;