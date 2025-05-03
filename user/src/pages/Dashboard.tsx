import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BookSlot from './BookSlot';
import Wallet from './Wallet';
import History from './History';
import Profile from './Profile';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-blue-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">User Panel</h2>
        <nav className="space-y-2">
          <Link to="/dashboard/book" className="block hover:text-blue-200">🚗 Book Slot</Link>
          <Link to="/dashboard/wallet" className="block hover:text-blue-200">💰 Wallet</Link>
          <Link to="/dashboard/history" className="block hover:text-blue-200">📜 History</Link>
          <Link to="/dashboard/profile" className="block hover:text-blue-200">👤 Profile</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        <Routes>
          <Route path="book" element={<BookSlot />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="history" element={<History />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
