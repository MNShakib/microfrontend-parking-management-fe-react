import React, { useEffect, useState } from 'react';
import '../styles/bookSlot.css';

interface Slot {
  _id: string;
  slotNumber: string;
  type: 'bike' | 'car';
  booked: boolean;
}

const BookSlot: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [vehicleForm, setVehicleForm] = useState({ bikeNumber: '', carNumber: '' });
  const [slots, setSlots] = useState<Slot[]>([]);
  const [vehicleType, setVehicleType] = useState<'bike' | 'car'>('car');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await fetch('http://localhost:4001/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUser(data);
      setVehicleForm({
        bikeNumber: data.bikeNumber || '',
        carNumber: data.carNumber || '',
      });
    };

    const fetchSlots = async () => {
      const res = await fetch('http://localhost:4004/api/bookings/available');
      const data = await res.json();
      setSlots(data);
    };

    if (token) {
      fetchUserProfile();
      fetchSlots();
    }
  }, [token]);

  const handleSave = async () => {
    const res = await fetch('http://localhost:4001/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(vehicleForm),
    });
    if (res.ok) {
      alert('Vehicle numbers updated!');
    }
  };

  const handleBook = async (slot: Slot) => {
    const vehicleNumber = vehicleType === 'car' ? vehicleForm.carNumber : vehicleForm.bikeNumber;
    const res = await fetch(`http://localhost:4001/api/user/book-slot/${slot._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ vehicleNumber, type: vehicleType }),
    });

    if (res.ok) {
      alert(`Booked ${slot.slotNumber}`);
      setSlots((prev) =>
        prev.map((s) => (s._id === slot._id ? { ...s, booked: true } : s))
      );
    } else {
      const errorData = await res.json();
      alert(errorData.message || 'Booking failed');
    }
  };

  const availableSlots = slots.filter((s) => s.type === vehicleType && !s.booked);

  return (
    <div className="bookslot-container">
      <h2>Book Parking Slot</h2>

      <div className="vehicle-form">
        <input
          type="text"
          placeholder="Bike Number"
          value={vehicleForm.bikeNumber}
          onChange={(e) =>
            setVehicleForm({ ...vehicleForm, bikeNumber: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Car Number"
          value={vehicleForm.carNumber}
          onChange={(e) =>
            setVehicleForm({ ...vehicleForm, carNumber: e.target.value })
          }
        />
        <button onClick={handleSave}>Save</button>
      </div>

      <div className="vehicle-toggle">
        <button
          className={vehicleType === 'car' ? 'active' : ''}
          onClick={() => setVehicleType('car')}
        >
          Car
        </button>
        <button
          className={vehicleType === 'bike' ? 'active' : ''}
          onClick={() => setVehicleType('bike')}
        >
          Bike
        </button>
      </div>

      <div className="slots-grid">
        {availableSlots.map((slot) => (
          <div key={slot._id} className="slot-card">
            <h4>{slot.slotNumber}</h4>
            <p>{slot.type.toUpperCase()}</p>
            <p>Available</p>
            <button onClick={() => handleBook(slot)}>Book</button>
          </div>
        ))}
        {availableSlots.length === 0 && (
          <p className="no-slots">No available slots found.</p>
        )}
      </div>
    </div>
  );
};

export default BookSlot;
