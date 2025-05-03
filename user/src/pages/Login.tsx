import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ userId: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/users?userId=${form.userId}&password=${form.password}`);
    const data = await res.json();
    if (data.length > 0) {
      localStorage.setItem('user', JSON.stringify(data[0]));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">User Login</h2>
        <input type="text" name="userId" placeholder="User ID" className="w-full p-2 border mb-3 rounded" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="w-full p-2 border mb-4 rounded" onChange={handleChange} required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        <p className="text-sm text-center mt-4">No account? <span className="text-blue-700 cursor-pointer" onClick={() => navigate('/register')}>Register</span></p>
      </form>
    </div>
  );
};

export default Login;