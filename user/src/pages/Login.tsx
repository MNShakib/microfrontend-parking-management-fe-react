import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('userTheme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:4001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen ${darkMode ? 'bg-[#070F2B]' : 'bg-[#F8FAFC]'}`}>
      {/* Left Info Panel */}
      <div className={`hidden md:flex w-1/2 items-center justify-center p-8 ${darkMode ? 'bg-[#1B1A55]' : 'bg-[#D9EAFD]'}`}>
        <div className="max-w-md text-center">
          <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-[#9290C3]' : 'text-[#535C91]'}`}>Welcome Back!</h2>
          <p className={`${darkMode ? 'text-[#9290C3]' : 'text-[#9AA6B2]'}`}>
            Sign in to access your personalized dashboard.
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className={`w-full max-w-md rounded-lg shadow-xl p-6 md:p-8 ${darkMode ? 'bg-[#1B1A55]' : 'bg-white'}`}>
          <div className="flex justify-between mb-6">
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-[#9290C3]' : 'text-[#535C91]'}`}>User Login</h3>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode ? 'bg-[#9290C3] text-black' : 'bg-[#BCCCDC] text-black'}`}
              title="Toggle theme"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className={`w-full p-3 rounded border outline-none ${darkMode ? 'bg-[#535C91] text-white border-[#9290C3]' : 'bg-[#BCCCDC]'}`}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={handleChange}
              className={`w-full p-3 rounded border outline-none ${darkMode ? 'bg-[#535C91] text-white border-[#9290C3]' : 'bg-[#BCCCDC]'}`}
            />
            <button
              type="submit"
              className={`w-full py-2 rounded font-semibold ${darkMode ? 'bg-[#9290C3] text-black' : 'bg-[#9AA6B2] text-white hover:bg-[#BCCCDC]'}`}
            >
              Login
            </button>
          </form>

          <p className={`mt-4 text-center ${darkMode ? 'text-[#9290C3]' : 'text-[#535C91]'}`}>
            Don't have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate('/register')}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
