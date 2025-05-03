import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ userId: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        bikeNumber: '',
        carNumber: ''
      })
    });
    navigate('/');
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">User Registration</h2>
        <input name="userId" placeholder="User ID" className="w-full p-2 border mb-2 rounded" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border mb-2 rounded" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border mb-4 rounded" onChange={handleChange} required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;