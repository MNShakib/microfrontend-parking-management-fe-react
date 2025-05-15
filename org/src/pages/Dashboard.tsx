import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Levels from './Levels';
import Slots from './Slots';
import Analytics from './Analytics';

const Dashboard: React.FC = () => (
  <div className="relative flex min-h-screen bg-gradient-to-br from-purple-200 via-white to-blue-200 overflow-hidden">
    {/* Background Bubbles */}
    <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
    <div className="absolute -bottom-32 -right-24 w-96 h-96 bg-white/10 rounded-full filter blur-2xl animate-pulse-slow"></div>

    {/* Sidebar */}
    <aside className="sticky top-0 h-screen flex-shrink-0 w-16 sm:w-64 bg-white bg-opacity-20 backdrop-blur-md shadow-xl animate-fade-in">
      <Sidebar />
    </aside>

    {/* Main Content */}
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="bg-white bg-opacity-20 backdrop-blur-md shadow-md z-10 animate-fade-in">
        <Navbar />
      </header>

      {/* Page Area */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl  shadow-xl animate-fade-up">
          <Routes>
            <Route path="levels"    element={<Levels />} />
            <Route path="slots"     element={<Slots />} />
            <Route path="analytics" element={<Analytics />} />
          </Routes>
        </div>
      </main>
    </div>
  </div>
);

export default Dashboard;
