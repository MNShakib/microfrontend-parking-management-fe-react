import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerOrganization } from '../apiService';
import '../styles//AddOrganization.css';

const AddOrganization: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    location: { country: '', state: '', city: '' },
  });

  const [error, setError] = useState('');
  const token = localStorage.getItem('adminToken');

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

  return (
    <div className="add-org-container">
      <div className="form-card">
        <h2>Add New Organization</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Organization Name
            <input name="name" placeholder="e.g., GreenMall" onChange={handleChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="admin@example.com" onChange={handleChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
          </label>

          <div className="grid-row">
            <label>
              Country
              <input name="country" placeholder="Country" onChange={handleChange} required />
            </label>
            <label>
              State
              <input name="state" placeholder="State" onChange={handleChange} required />
            </label>
            <label>
              City
              <input name="city" placeholder="City" onChange={handleChange} required />
            </label>
          </div>

          <button type="submit">Create Organization</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrganization;
