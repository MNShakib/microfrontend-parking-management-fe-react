import React, { useEffect, useState } from 'react';
import '../styles/profile.css';

const Profile = () => {
  const [form, setForm] = useState({ name: '', carNumber: '', bikeNumber: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('http://localhost:4001/api/user/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setForm({
        name: data.name || '',
        carNumber: data.carNumber || '',
        bikeNumber: data.bikeNumber || ''
      });
    };
    if (token) fetchProfile();
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const res = await fetch('http://localhost:4001/api/user/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setMessage('Profile updated successfully!');
    } else {
      setMessage('Failed to update profile.');
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-form">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
        <input name="carNumber" value={form.carNumber} onChange={handleChange} placeholder="Car Number" />
        <input name="bikeNumber" value={form.bikeNumber} onChange={handleChange} placeholder="Bike Number" />
        <button onClick={handleUpdate}>Update Profile</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Profile;