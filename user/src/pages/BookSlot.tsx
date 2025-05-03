import React, { useEffect, useState } from 'react';

const BookSlot = () => {
  const [user, setUser] = useState<any>(null);
  const [vehicleForm, setVehicleForm] = useState({ bike: '', car: '' });
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<any[]>([]);
  const [vehicleType, setVehicleType] = useState<'bike' | 'car'>('car');
  const [location, setLocation] = useState({ country: '', state: '', city: '', orgId: '' });

  // 🔁 Fetch latest user data from localStorage & server
  const fetchUser = async () => {
    const stored = localStorage.getItem('user');
    if (!stored) return;
    const localUser = JSON.parse(stored);
    const res = await fetch(`http://localhost:4000/users/${localUser.id}`);
    const userData = await res.json();
    setUser(userData);
    setVehicleForm({
      bike: userData.bikeNumber || '',
      car: userData.carNumber || ''
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    const onFocus = () => fetchUser();
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/organizations').then(res => res.json()).then(setOrganizations);
    fetch('http://localhost:4000/slots').then(res => res.json()).then(setSlots);
  }, []);

  useEffect(() => {
    const filtered = slots.filter(
      s => s.type === vehicleType && !s.booked && s.levelId === location.orgId
    );
    setFilteredSlots(filtered);
  }, [vehicleType, location.orgId, slots]);

  const handleSave = async () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      bikeNumber: vehicleForm.bike,
      carNumber: vehicleForm.car
    };

    await fetch(`http://localhost:4000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    });

    // 🔄 Update state and localStorage
    setUser(updatedUser);
    setVehicleForm({
      bike: updatedUser.bikeNumber,
      car: updatedUser.carNumber
    });
    localStorage.setItem('user', JSON.stringify(updatedUser));
    alert('Vehicle numbers updated!');
  };

  const handleBook = async (slot: any) => {
    await fetch(`http://localhost:4000/slots/${slot.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ booked: true })
    });

    alert(`Booked ${slot.slotNumber}`);
    setSlots(prev => prev.map(s => (s.id === slot.id ? { ...s, booked: true } : s)));
  };

  const unique = (arr: any[], key: string) => [...new Set(arr.map((i) => i[key]))];

  const cities = unique(
    organizations.filter(o => o.country === location.country && o.state === location.state),
    'city'
  );

  const states = unique(
    organizations.filter(o => o.country === location.country),
    'state'
  );

  const orgs = organizations.filter(
    o =>
      o.country === location.country &&
      o.state === location.state &&
      o.city === location.city
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Book Parking Slot</h2>

      {/* 🚘 Vehicle Numbers */}
      <div className="mb-6 bg-white p-4 rounded shadow max-w-xl">
        <h3 className="font-semibold text-gray-700 mb-2">My Vehicles</h3>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={vehicleForm.bike}
            onChange={(e) => setVehicleForm({ ...vehicleForm, bike: e.target.value })}
            className="border rounded p-2 w-full"
            placeholder="Bike Number"
          />
          <input
            type="text"
            value={vehicleForm.car}
            onChange={(e) => setVehicleForm({ ...vehicleForm, car: e.target.value })}
            className="border rounded p-2 w-full"
            placeholder="Car Number"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>

      {/* 📍 Location Filter */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select
          className="p-2 border rounded"
          value={location.country}
          onChange={(e) => setLocation({ ...location, country: e.target.value, state: '', city: '', orgId: '' })}
        >
          <option value="">Select Country</option>
          {unique(organizations, 'country').map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={location.state}
          onChange={(e) => setLocation({ ...location, state: e.target.value, city: '', orgId: '' })}
          disabled={!location.country}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={location.city}
          onChange={(e) => setLocation({ ...location, city: e.target.value, orgId: '' })}
          disabled={!location.state}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select
          className="p-2 border rounded"
          value={location.orgId}
          onChange={(e) => setLocation({ ...location, orgId: e.target.value })}
          disabled={!location.city}
        >
          <option value="">Select Organization</option>
          {orgs.map((o) => (
            <option key={o.id} value={o.id}>{o.name}</option>
          ))}
        </select>
      </div>

      {/* 🚗 Vehicle Type Switch */}
      <div className="mb-6 flex items-center gap-4">
        <button
          className={`px-4 py-2 rounded ${vehicleType === 'car' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setVehicleType('car')}
        >
          Car
        </button>
        <button
          className={`px-4 py-2 rounded ${vehicleType === 'bike' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setVehicleType('bike')}
        >
          Bike
        </button>
        <span className="ml-auto font-semibold text-gray-600">
          Number: {vehicleType === 'car' ? vehicleForm.car : vehicleForm.bike}
        </span>
      </div>

      {/* 📦 Slots */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSlots.map((slot) => (
          <div key={slot.id} className="bg-white border rounded-lg shadow p-4">
            <h4 className="text-lg font-bold">{slot.slotNumber}</h4>
            <p className="text-gray-600">{slot.type.toUpperCase()}</p>
            <p className="text-green-600 font-semibold">Available</p>
            <button
              className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => handleBook(slot)}
            >
              Book Slot
            </button>
          </div>
        ))}
      </div>

      {filteredSlots.length === 0 && (
        <div className="mt-4 text-gray-500 italic">No available slots. Select filters to begin.</div>
      )}
    </div>
  );
};

export default BookSlot;
