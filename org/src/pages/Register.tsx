
// ✅ Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', orgId: '', password: '', country: '', state: '', city: '', address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:4010/organizations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Register Organization</h2>
        <input name="name" placeholder="Name" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
        <input name="orgId" placeholder="Org ID" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
        <input name="password" placeholder="Password" type="password" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
        <input name="country" placeholder="Country" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
        <input name="state" placeholder="State" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
        <input name="city" placeholder="City" className="w-full mb-2 p-2 border rounded" onChange={handleChange} required />
        <input name="address" placeholder="Address" className="w-full mb-4 p-2 border rounded" onChange={handleChange} required />
        <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Register;
