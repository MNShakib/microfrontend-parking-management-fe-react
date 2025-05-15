import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerOrganization } from '../apiService';

const AddOrganization: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    location: { country: '', state: '', city: '' },
  });

  const [error, setError] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('adminTheme') || 'light');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const updateTheme = () => setTheme(localStorage.getItem('app-theme') || 'light');
    window.addEventListener('storage', updateTheme);
    window.addEventListener('themeChanged', updateTheme);
    return () => {
      window.removeEventListener('storage', updateTheme);
      window.removeEventListener('themeChanged', updateTheme);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (['country', 'state', 'city'].includes(name)) {
      setForm(prev => ({ ...prev, location: { ...prev.location, [name]: value } }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return setError('Unauthorized. Please log in first.');
    try {
      await registerOrganization(token, form);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to register organization.');
    }
  };

  const bgClass = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
  const inputClass =
    'p-2 border rounded w-full bg-transparent border-gray-400 focus:outline-none focus:border-blue-500';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgClass}`}>
      <div className="w-full max-w-md p-8 rounded shadow-lg border border-gray-300">
        <h2 className="text-2xl mb-4 font-semibold">Add New Organization</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Organization Name</label>
            <input
              name="name"
              placeholder="e.g., GreenMall"
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Country</label>
              <input
                name="country"
                placeholder="Country"
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block mb-1">State</label>
              <input
                name="state"
                placeholder="State"
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block mb-1">City</label>
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Organization
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrganization;
