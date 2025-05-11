

// ✅ Levels.tsx
import React, { useEffect, useState } from 'react';

const Levels: React.FC = () => {
  const [levels, setLevels] = useState<any[]>([]);
  const [name, setName] = useState('');

  const fetchLevels = async () => {
    const res = await fetch('http://localhost:4010/levels');
    const data = await res.json();
    setLevels(data);
  };

  const addLevel = async () => {
    await fetch('http://localhost:4010/levels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    setName('');
    fetchLevels();
  };

  useEffect(() => { fetchLevels(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Parking Levels</h2>
      <div className="flex gap-2 mb-4">
        <input value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded w-1/2" placeholder="Level name" />
        <button onClick={addLevel} className="bg-blue-600 text-white px-4 rounded">Add</button>
      </div>
      <ul className="space-y-2">
        {levels.map((lvl) => (
          <li key={lvl.id} className="p-3 bg-white rounded shadow">{lvl.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Levels;
