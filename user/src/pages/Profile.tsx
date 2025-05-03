import React, { useEffect, useState } from 'react';

const Profile = () => {
  const storedUser = localStorage.getItem('user');
  const userObj = storedUser ? JSON.parse(storedUser) : null;
  const userId = userObj?.userId;

  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    bikeNumber: '',
    carNumber: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:4000/users?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        const userData = data[0];
        setUser(userData);
        setForm({
          name: userData.name || '',
          email: userData.email || '',
          password: userData.password || '',
          bikeNumber: userData.bikeNumber || '',
          carNumber: userData.carNumber || ''
        });
      });
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!user) return;

    const updatedUser = { ...user, ...form };

    const res = await fetch(`http://localhost:4000/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    });

    if (res.ok) {
      setMessage('Profile updated successfully!');
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser)); // ✅ sync localStorage
    } else {
      setMessage('Update failed.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <div className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border rounded"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded"
        />
        <input
          name="bikeNumber"
          value={form.bikeNumber}
          onChange={handleChange}
          placeholder="Bike Number"
          className="w-full p-2 border rounded"
        />
        <input
          name="carNumber"
          value={form.carNumber}
          onChange={handleChange}
          placeholder="Car Number"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;
