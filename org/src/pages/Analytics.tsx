import React from 'react';

const Analytics: React.FC = () => (
  <div className="glass p-6 rounded shadow-md">
    <h2 className="text-2xl font-bold mb-4">Parking Slot Analytics</h2>
    <div className="bg-white p-6 shadow rounded">
      <p>Total Slots: 20</p>
      <p>Booked: 8</p>
      <p>Available: 12</p>
      <div className="mt-4">
        <p className="text-sm text-gray-500">(This is mock data. Replace with real-time stats later.)</p>
      </div>
    </div>
  </div>
);

export default Analytics;
