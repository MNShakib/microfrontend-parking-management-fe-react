import React, { useEffect, useState } from 'react';
import { FaCar, FaBicycle } from 'react-icons/fa';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';
import { HiX } from 'react-icons/hi';

interface Slot {
  _id: string;
  slotNumber: string;
  status: 'available' | 'occupied';
  bookedBy?: string;
  vehicleNumber?: string;
}
interface Level {
  levelIdentifier: string;
  slots: Slot[];
}
interface SlotDoc {
  carLevels: Level[];
  bikeLevels: Level[];
}

const Slots: React.FC = () => {
  const orgId = localStorage.getItem('orgId')!;
  const token = localStorage.getItem('token')!;

  const [doc, setDoc] = useState<SlotDoc | null>(null);
  const [level, setLevel] = useState('A');
  const [slotType, setSlotType] = useState<'car' | 'bike'>('car');
  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);
  const perPage = 12;
  const [selected, setSelected] = useState<Slot | null>(null);
  const [error, setError] = useState('');

  const toNum = (l: string) => l.charCodeAt(0) - 64;

  // Load on mount & whenever slotType/orgId/token changes
  useEffect(() => {
    if (!orgId) return;
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/organization/slots/${orgId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error('Failed to load slots');
        const data: SlotDoc = await res.json();
        setDoc(data);

        // ensure level exists
        const lvls = slotType === 'car' ? data.carLevels : data.bikeLevels;
        if (lvls.length && !lvls.find(l => l.levelIdentifier === level)) {
          setLevel(lvls[0].levelIdentifier);
          setPage(1);
        }
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [slotType, orgId, token]);

  // Clamp page index
  useEffect(() => {
    if (!doc) return;
    const lvls = slotType === 'car' ? doc.carLevels : doc.bikeLevels;
    const cur = lvls.find(l => l.levelIdentifier === level);
    const total = cur ? cur.slots.length : 0;
    const pages = Math.max(1, Math.ceil(total / perPage));
    if (page > pages) setPage(pages);
  }, [doc, level, slotType]);

  const refresh = async () => {
    const res = await fetch(
      `http://localhost:3001/api/organization/slots/${orgId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setDoc(await res.json());
  };

  const handleAdd = async () => {
    setError('');
    if (count < 1) return setError('Enter at least 1 slot');
    try {
      await fetch('http://localhost:3001/api/organization/slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          organizationId: orgId,
          level: toNum(level),
          carSlots: slotType === 'car' ? count : 0,
          bikeSlots: slotType === 'bike' ? count : 0
        })
      });
      await refresh();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleDelete = async () => {
    setError('');
    if (count < 1) return setError('Enter at least 1 slot');
    if (!doc) return;
    const lvls = slotType === 'car' ? doc.carLevels : doc.bikeLevels;
    const cur = lvls.find(l => l.levelIdentifier === level);
    const avail = cur
      ? cur.slots.filter(s => s.status === 'available').length
      : 0;
    if (count > avail) return setError(`Only ${avail} available`);
    try {
      await fetch(`http://localhost:3001/api/organization/slots/${orgId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          organizationId: orgId,
          type: slotType,
          level: toNum(level),
          decreaseBy: count
        })
      });
      await refresh();
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (!doc) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-700">
        {error ? `Error: ${error}` : 'Loading slots…'}
      </div>
    );
  }

  const lvls = slotType === 'car' ? doc.carLevels : doc.bikeLevels;
  const cur = lvls.find(l => l.levelIdentifier === level) || { slots: [] };
  const slots = cur.slots;
  const pages = Math.max(1, Math.ceil(slots.length / perPage));
  const paginated = slots.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="relative min-h-screen  rounded-3xl bg-gradient-to-br from-purple-500 via-indigo-400 to-blue-300 overflow-hidden p-6">
      {/* Blobs */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-white/20 rounded-full animate-pulse-slow"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full animate-pulse-slow"></div>

      <div className=" glass relative max-w-5xl mx-auto bg-white bg-opacity-95 rounded-2xl shadow-xl p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Slot Manager
        </h1>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          {/* Level */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <label className="text-gray-700 mr-2">Level</label>
            <select
              value={level}
              onChange={e => {
                setLevel(e.target.value);
                setPage(1);
              }}
              className="bg-transparent text-gray-700 focus:outline-none"
            >
              {lvls.map(lvl => (
                <option key={lvl.levelIdentifier} value={lvl.levelIdentifier}>
                  {lvl.levelIdentifier}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="flex gap-2">
            <button
              onClick={() => setSlotType('car')}
              className={`p-2 rounded-lg ${
                slotType === 'car'
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 text-gray-700'
              }`}
            >
              <FaCar size={20} />
            </button>
            <button
              onClick={() => setSlotType('bike')}
              className={`p-2 rounded-lg ${
                slotType === 'bike'
                  ? 'bg-blue-500 text-white'
                  : 'border border-gray-300 text-gray-700'
              }`}
            >
              <FaBicycle size={20} />
            </button>
          </div>

          {/* Count */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <IoRemoveCircleOutline
              size={24}
              className="text-gray-700 cursor-pointer"
              onClick={() => setCount(c => Math.max(1, c - 1))}
            />
            <input
              type="number"
              min="1"
              value={count}
              onChange={e => setCount(Number(e.target.value))}
              className="w-16 mx-2 text-center bg-transparent focus:outline-none"
            />
            <IoAddCircleOutline
              size={24}
              className="text-gray-700 cursor-pointer"
              onClick={() => setCount(c => c + 1)}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow"
            >
              Add Slots
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
            >
              Remove Slots
            </button>
          </div>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {paginated.map(s => (
            <div
              key={s._id}
              onClick={() => s.status === 'occupied' && setSelected(s)}
              className={`border-2 rounded-xl p-4 cursor-pointer transition hover:shadow-lg ${
                s.status === 'occupied'
                  ? 'border-red-400'
                  : 'border-green-400'
              }`}
            >
              <p className="text-lg font-bold">{s.slotNumber}</p>
              <p className="uppercase text-sm">
                {slotType} SLOT
              </p>
              <p className="mt-1 text-sm text-gray-700">
                {s.status === 'available' ? 'Available' : 'Booked'}
              </p>
            </div>
          ))}
        </div>

        {paginated.length === 0 && (
          <p className="text-center text-gray-600 mt-8">
            No slots in this level.
          </p>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  page === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full">
              <HiX
                size={28}
                className="absolute top-4 right-4 cursor-pointer text-gray-700"
                onClick={() => setSelected(null)}
              />
              <h3 className="text-2xl font-bold mb-4">
                {selected.slotNumber}
              </h3>
              <p><strong>Status:</strong> {selected.status}</p>
              {selected.status === 'occupied' && (
                <>
                  <p><strong>Booked By:</strong> {selected.bookedBy}</p>
                  <p><strong>Vehicle:</strong> {selected.vehicleNumber}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Slots;
