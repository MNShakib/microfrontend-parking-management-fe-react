import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ orgId: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4010/organizations?orgId=${form.orgId}&password=${form.password}`);
    const data = await res.json();
    if (data.length > 0) navigate('/dashboard');
    else alert('Invalid credentials');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Organization Login</h2>
        <input type="text" name="orgId" placeholder="Organization ID" className="w-full mb-4 p-2 border rounded" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded mb-2">Login</button>
        <button type="button" onClick={() => navigate('/register')} className="w-full bg-gray-200 text-blue-700 p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default Login;