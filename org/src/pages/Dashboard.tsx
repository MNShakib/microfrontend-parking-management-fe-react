import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Levels from './Levels';
import Slots from './Slots';
import Analytics from './Analytics';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 overflow-y-auto">
          <Routes>
            <Route path="levels" element={<Levels />} />
            <Route path="slots" element={<Slots />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
