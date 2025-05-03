import React, { useEffect, useState } from 'react';

const History = () => {
  const userId = 'user1'; // mocked for now
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://localhost:4000/bookings?userId=${userId}`)
      .then(res => res.json())
      .then(setBookings);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Booking History</h2>
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Slot</th>
              <th className="border px-4 py-2">Vehicle</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="text-center">
                <td className="border px-4 py-2">{b.slotNumber}</td>
                <td className="border px-4 py-2">{b.type.toUpperCase()}</td>
                <td className="border px-4 py-2">{new Date(b.date).toLocaleString()}</td>
                <td className="border px-4 py-2">₹{b.amount}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={4} className="text-gray-500 py-4">No bookings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
