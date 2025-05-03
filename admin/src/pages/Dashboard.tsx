import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Organizations from './Organizations';
import AddOrganization from './AddOrganization';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Organizations />} />
            <Route path="add" element={<AddOrganization />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
