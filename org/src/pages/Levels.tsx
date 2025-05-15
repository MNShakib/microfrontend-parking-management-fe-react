import React, { useEffect, useState } from 'react';
import { FaCar, FaBicycle, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

interface Level {
  _id: string;
  levelIdentifier: string;
  availableSlots: number;
  bookedSlots: number;
}
interface SlotDoc {
  carLevels: Level[];
  bikeLevels: Level[];
}

const Levels: React.FC = () => {
  const orgId = localStorage.getItem('orgId')!;
  const token = localStorage.getItem('token')!;

  const [doc, setDoc] = useState<SlotDoc | null>(null);
  const [mode, setMode] = useState<'car' | 'bike'>('car');
  const [newLvl, setNewLvl] = useState({ level: 1, carSlots: 0, bikeSlots: 0 });
  const [error, setError] = useState('');

  // Fetch on mount & whenever mode/orgId/token changes
  useEffect(() => {
    if (!orgId || !token) return;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/organization/slots/${orgId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error('Failed to load levels');
        setDoc(await res.json());
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [mode, orgId, token]);

  const refresh = async () => {
    const res = await fetch(
      `http://localhost:3001/api/organization/slots/${orgId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDoc(await res.json());
  };

  const addLevel = async () => {
    setError('');
    if (newLvl.level < 1) return setError('Level must be ≥ 1');
    try {
      await fetch('http://localhost:3001/api/organization/slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          organizationId: orgId,
          level: newLvl.level,
          carSlots: newLvl.carSlots,
          bikeSlots: newLvl.bikeSlots
        })
      });
      await refresh();
      setNewLvl({ level: newLvl.level + 1, carSlots: 0, bikeSlots: 0 });
    } catch (e: any) {
      setError(e.message || 'Failed to add level');
    }
  };

  const deleteLevel = async (letter: string) => {
    setError('');
    try {
      const res = await fetch(
        `http://localhost:3001/api/organization/slots/${orgId}/levels/${mode}/${letter}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message || 'Delete failed');
      }
      await refresh();
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (!doc) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-700">
        {error ? `Error: ${error}` : 'Loading levels…'}
      </div>
    );
  }

  const levels = mode === 'car' ? doc.carLevels : doc.bikeLevels;

  return (
    <div className="rounded-3xl relative min-h-screen bg-gradient-to-br from-purple-500 via-indigo-400 to-blue-300 overflow-hidden p-6">
      {/* Animated blobs */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/20 rounded-full animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full animate-pulse-slow"></div>

      <div className="relative max-w-5xl mx-auto bg-white bg-opacity-95 rounded-2xl shadow-xl p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Manage Parking Levels
        </h1>

        {/* Add Level Form */}
        <div className="space-y-4 mb-8">
          {error && <p className="text-red-600">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="number"
              min={1}
              value={newLvl.level}
              onChange={e => setNewLvl(v => ({ ...v, level: +e.target.value }))}
              placeholder="Level #"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none"
            />
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <FaCar className="text-green-500 mr-2" />
              <input
                type="number"
                min={0}
                value={newLvl.carSlots}
                onChange={e => setNewLvl(v => ({ ...v, carSlots: +e.target.value }))}
                placeholder="Car Slots"
                className="w-full p-3 focus:outline-none"
              />
            </div>
            <div className="flex items-center border border-gray-300 rounded-lg px-3">
              <FaBicycle className="text-red-500 mr-2" />
              <input
                type="number"
                min={0}
                value={newLvl.bikeSlots}
                onChange={e => setNewLvl(v => ({ ...v, bikeSlots: +e.target.value }))}
                placeholder="Bike Slots"
                className="w-full p-3 focus:outline-none"
              />
            </div>
            <button
              onClick={addLevel}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-3 transition"
            >
              <FaPlusCircle /> Add Level
            </button>
          </div>
        </div>

        {/* Toggle Car/Bike */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setMode('car')}
            className={`px-6 py-2 rounded-full ${
              mode === 'car' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Car Levels
          </button>
          <button
            onClick={() => setMode('bike')}
            className={`px-6 py-2 rounded-full ${
              mode === 'bike' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Bike Levels
          </button>
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map(lv => (
            <div
              key={lv._id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Level {lv.levelIdentifier}
                </h2>
                <FaTrashAlt
                  onClick={() => deleteLevel(lv.levelIdentifier)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                />
              </div>
              <div className="flex justify-around text-gray-800">
                <div className="flex items-center gap-2">
                  <FaCar className="text-green-500" />{' '}
                  <span>{lv.availableSlots}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBicycle className="text-red-500" />{' '}
                  <span>{lv.bookedSlots}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Levels;
