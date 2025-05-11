// ✅ Slots.tsx
import React, { useEffect, useState } from 'react';

const Slots: React.FC = () => {
  const [levelId, setLevelId] = useState('');
  const [slotType, setSlotType] = useState<'bike' | 'car'>('car');
  const [slots, setSlots] = useState<any[]>([]);
  const [levels, setLevels] = useState<any[]>([]);
  const [count, setCount] = useState(1);
  const [perPage] = useState(8);
  const [page, setPage] = useState(1);

  const fetchSlots = async () => {
    const res = await fetch('http://localhost:4010/slots');
    const data = await res.json();
    setSlots(data);
  };

  const fetchLevels = async () => {
    const res = await fetch('http://localhost:4010/levels');
    const data = await res.json();
    setLevels(data);
  };

  const handleAddSlots = async () => {
    if (!levelId || count < 1) {
      alert('Please select a level and enter a valid number of slots.');
      return;
    }
    const existingSlots = slots.filter(s => s.levelId === levelId && s.type === slotType);
    const currentMax = existingSlots.length;

    const levelLetter = getLevelLetterById(levelId);
    for (let i = 1; i <= count; i++) {
      const slotNumber = `${levelLetter}${currentMax + i}`;
      await fetch('http://localhost:4010/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ levelId, type: slotType, booked: false, slotNumber })
      });
    }
    fetchSlots();
  };

  const handleDeleteSlots = async () => {
    if (!levelId || count < 1) {
      alert('Please select a level and enter a valid number to delete.');
      return;
    }
    const toDelete = slots.filter(s => s.levelId === levelId && s.type === slotType && !s.booked).slice(0, count);
    await Promise.all(toDelete.map(s => fetch(`http://localhost:4010/slots/${s.id}`, { method: 'DELETE' })));
    fetchSlots();
  };

  const getLevelLetterById = (id: string) => {
    const levelIndex = levels.findIndex((lvl) => lvl.id === id);
    return String.fromCharCode(65 + levelIndex); // A-Z based on order
  };

  useEffect(() => {
    fetchLevels();
    fetchSlots();
  }, []);

  const filtered = slots.filter(s => s.levelId === levelId && s.type === slotType);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const pages = Math.ceil(filtered.length / perPage);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Slots</h2>
      <div className="flex gap-2 mb-4 flex-wrap">
        <select value={levelId} onChange={(e) => setLevelId(e.target.value)} className="p-2 border rounded">
          <option value="">Select Level</option>
          {levels.map((lvl) => (
            <option key={lvl.id} value={lvl.id}>{lvl.name}</option>
          ))}
        </select>
        <select value={slotType} onChange={(e) => setSlotType(e.target.value as 'car' | 'bike')} className="p-2 border rounded">
          <option value="car">Car</option>
          <option value="bike">Bike</option>
        </select>
        <input
          type="number"
          min="1"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="p-2 border rounded w-24"
          placeholder="Count"
        />
        <button onClick={handleAddSlots} className="bg-green-600 text-white px-4 rounded">+ Slots</button>
        <button onClick={handleDeleteSlots} className="bg-red-600 text-white px-4 rounded">- Slots</button>
      </div>

      {!levelId && (
        <div className="text-red-500 font-semibold mb-4">⚠️ Please select a level to view and manage slots.</div>
      )}

      {levelId && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {paginated.map((slot) => (
            <div key={slot.id} className={`rounded-lg border shadow text-center p-4 ${slot.booked ? 'bg-gray-200' : 'bg-green-100'}`}>
              <p className="font-bold">{slot.slotNumber}</p>
              <p>{slot.type.toUpperCase()} SLOT</p>
              <p>Status: {slot.booked ? 'Booked' : 'Available'}</p>
            </div>
          ))}
        </div>
      )}

      {pages > 1 && levelId && (
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Slots;
