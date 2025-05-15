// src/components/RegistrationForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate }            from 'react-router-dom';
import { Country, State, City }   from 'country-state-city';
import {
  FaBuilding,
  FaEnvelope,
  FaLock,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaCity
} from 'react-icons/fa';

interface FormShape {
  name:     string;
  email:    string;
  password: string;
  location: {
    country: string;
    state:   string;
    city:    string;
  };
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormShape>({
    name: '', email: '', password: '',
    location: { country: '', state: '', city: '' }
  });
  const [countries, setCountries] = useState<any[]>([]);
  const [states,    setStates]    = useState<any[]>([]);
  const [cities,    setCities]    = useState<any[]>([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (form.location.country) {
      setStates(State.getStatesOfCountry(form.location.country));
    } else {
      setStates([]);
    }
    setForm(f => ({
      ...f,
      location: { ...f.location, state: '', city: '' }
    }));
    setCities([]);
  }, [form.location.country]);

  useEffect(() => {
    if (form.location.country && form.location.state) {
      setCities(City.getCitiesOfState(
        form.location.country,
        form.location.state
      ));
    } else {
      setCities([]);
    }
    setForm(f => ({
      ...f,
      location: { ...f.location, city: '' }
    }));
  }, [form.location.state, form.location.country]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleLocationChange = (e: any) => {
    const { name, value } = e.target;
    setForm(f => ({
      ...f,
      location: { ...f.location, [name]: value }
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      'http://localhost:3001/api/organization/register',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }
    );
    const data = await res.json();
    if (res.status === 201) {
      alert('Organization registered successfully!');
      navigate('/');
    } else {
      alert(data.message || 'Error during registration');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen 
                    bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600
                    px-6 py-12">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-lg bg-white/30 
                   border border-white/20 rounded-3xl shadow-2xl 
                   p-10 space-y-8"
      >
        <h2 className="text-4xl font-extrabold text-gray-900 text-center">
          Create Your Account
        </h2>

        <div className="space-y-6">
          {/* Organization Name */}
          <div className="flex items-center gap-4 bg-white/50 rounded-xl px-4 py-3 border border-gray-200">
            <FaBuilding className="text-indigo-600 text-2xl" />
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Organization Name"
              className="w-full  placeholder-gray-500 text-gray-800 
                         focus:outline-none text-lg"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 bg-white/50 rounded-xl px-4 py-3 border border-gray-200">
            <FaEnvelope className="text-indigo-600 text-2xl" />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full  placeholder-gray-500 text-gray-800 
                         focus:outline-none text-lg"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-4 bg-white/50 rounded-xl px-4 py-3 border border-gray-200">
            <FaLock className="text-indigo-600 text-2xl" />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full  placeholder-gray-500 text-gray-800 
                         focus:outline-none text-lg"
              required
            />
          </div>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 bg-white/50 rounded-xl px-4 py-3 border border-gray-200">
            <FaGlobeAmericas className="text-indigo-600 text-xl" />
            <select
              name="country"
              value={form.location.country}
              onChange={handleLocationChange}
              className="w-full text-gray-800 focus:outline-none text-lg"
              required
            >
              <option value="" disabled className="text-gray-500">
                Country
              </option>
              {countries.map(c => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 bg-white/50 rounded-xl px-4 py-3 border border-gray-200">
            <FaMapMarkerAlt className="text-indigo-600 text-xl" />
            <select
              name="state"
              value={form.location.state}
              onChange={handleLocationChange}
              disabled={!states.length}
              className="w-full  text-gray-800 focus:outline-none text-lg disabled:opacity-50"
              required
            >
              <option value="" disabled className="text-gray-500">
                State
              </option>
              {states.map(s => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 bg-white/50 rounded-xl px-4 py-3 border border-gray-200">
            <FaCity className="text-indigo-600 text-xl" />
            <select
              name="city"
              value={form.location.city}
              onChange={handleLocationChange}
              disabled={!cities.length}
              className="w-full  text-gray-800 focus:outline-none text-lg disabled:opacity-50"
              required
            >
              <option value="" disabled className="text-gray-500">
                City
              </option>
              {cities.map(c => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-4 bg-indigo-600 text-white text-lg font-semibold 
                     rounded-xl shadow-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-900">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
