import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (login)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3001/api/organization/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      
      if (res.status === 200) {
        // Save orgId and token to localStorage
        localStorage.setItem('orgId', data.organization._id); // Save orgId
        localStorage.setItem('token', data.token); // Save JWT token

        // Redirect to dashboard on successful login
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md transition-all duration-500 transform hover:scale-105">
        <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-600">Organization Login</h2>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={form.email}
              required
            />
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={form.password}
              required
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Register Link */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-500">
            Don't have an account? 
            <button
              onClick={() => navigate('/register')}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
