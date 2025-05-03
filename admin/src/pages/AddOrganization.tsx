import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddOrganization: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: '',
    name: '',
    country: '',
    state: '',
    city: '',
    status: 'pending'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:4003/organizations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    navigate('/dashboard');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Organization</h2>
      <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Organization Name" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="id" placeholder="Organization ID" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="country" placeholder="Country" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" className="w-full p-2 border rounded" onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" className="w-full p-2 border rounded" onChange={handleChange} required />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Create</button>
      </form>
    </div>
  );
};

export default AddOrganization;
