import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Organizations from './Organizations';
import AddOrganization from './AddOrganization';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-main">
        <Routes>
          <Route path="/" element={<Organizations />} />
          <Route path="add" element={<AddOrganization />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
