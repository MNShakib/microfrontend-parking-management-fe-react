import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('adminTheme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const navigate = useNavigate();

  // Handle theme toggle and save preference
  useEffect(() => {
    localStorage.setItem('adminTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5004/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      
      // Navigate programmatically (replacing react-router-dom's useNavigate)
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen ${darkMode ? 'bg-[#222831]' : 'bg-[#FBFBFB]'}`}>
      {/* Left side - Image */}
      <div className={`hidden md:flex md:w-1/2 ${darkMode ? 'bg-[#DFD0B8]' : 'bg-[#E8F9FF]'} items-center justify-center p-8`}>
        <div className="max-w-md">
          <div className="mb-6">
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-[#222831]' : 'text-[#393E46]'}`}>Admin Dashboard</h1>
            <p className={`mt-2 ${darkMode ? 'text-[#393E46]' : 'text-[#666]'}`}>Manage your application securely with our admin tools.</p>
          </div>
          <div className={`${darkMode ? 'bg-white/80' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-full h-64 ${darkMode ? 'text-[#948979]' : 'text-[#C4D9FF]'}`}>
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 5c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 12.5c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
            <div className={`mt-4 text-center ${darkMode ? 'text-[#393E46]' : 'text-[#666]'}`}>
              <p className="font-semibold">Welcome Back</p>
              <p className="mt-1 text-sm">Sign in to access your admin panel</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className={`${darkMode ? 'bg-[#393E46]' : 'bg-white'} shadow-xl rounded-lg p-6 md:p-8 w-full max-w-md`}>
          <div className="flex justify-between items-center mb-6">
            <div className={`${darkMode ? 'bg-[#222831]' : 'bg-[#E8F9FF]'} rounded-full p-3`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-8 h-8 ${darkMode ? 'text-[#DFD0B8]' : 'text-[#393E46]'}`}>
                <path d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3A5.25 5.25 0 0012 1.5zm0 2.25a3 3 0 013 3v3H9v-3a3 3 0 013-3z" />
              </svg>
            </div>
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${darkMode ? 'bg-[#222831] text-[#DFD0B8]' : 'bg-[#E8F9FF] text-[#393E46]'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" />
                </svg>
              )}
            </button>
          </div>
          
          <h2 className={`text-2xl font-bold text-center ${darkMode ? 'text-[#DFD0B8]' : 'text-[#393E46]'} mb-6`}>Admin Login</h2>
          
          <div>
            <div className="mb-4">
              <label htmlFor="username" className={`block text-sm font-medium ${darkMode ? 'text-[#DFD0B8]' : 'text-[#393E46]'} mb-1`}>Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${darkMode ? 'text-[#948979]' : 'text-[#C4D9FF]'}`}>
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className={`w-full pl-10 p-3 ${
                    darkMode 
                      ? 'bg-[#222831] text-[#DFD0B8] border-[#948979]' 
                      : 'bg-[#FBFBFB] text-[#393E46] border-[#C4D9FF]'
                  } border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                    darkMode 
                      ? 'focus:ring-[#DFD0B8] focus:border-[#DFD0B8]' 
                      : 'focus:ring-[#C4D9FF] focus:border-[#C4D9FF]'
                  }`}
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-[#DFD0B8]' : 'text-[#393E46]'} mb-1`}>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${darkMode ? 'text-[#948979]' : 'text-[#C4D9FF]'}`}>
                    <path d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" />
                  </svg>
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className={`w-full pl-10 p-3 ${
                    darkMode 
                      ? 'bg-[#222831] text-[#DFD0B8] border-[#948979]' 
                      : 'bg-[#FBFBFB] text-[#393E46] border-[#C4D9FF]'
                  } border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                    darkMode 
                      ? 'focus:ring-[#DFD0B8] focus:border-[#DFD0B8]' 
                      : 'focus:ring-[#C4D9FF] focus:border-[#C4D9FF]'
                  }`}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin();
                    }
                  }}
                />
              </div>
            </div>

            {/* Forgot password link */}
            <div className="flex justify-end mb-6">
              <a href="#" className={`text-sm ${darkMode ? 'text-[#DFD0B8] hover:text-[#948979]' : 'text-[#393E46] hover:text-[#C4D9FF]'} transition duration-200`}>
                Forgot password?
              </a>
            </div>

            {/* Error message */}
            {error && <div className="p-3 mb-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>}

            {/* Login button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg shadow-md transition duration-200 flex items-center justify-center font-medium ${
                darkMode 
                  ? 'bg-[#948979] text-[#222831] hover:bg-[#DFD0B8]' 
                  : 'bg-[#C4D9FF] text-[#393E46] hover:bg-[#E8F9FF]'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className={`text-sm ${darkMode ? 'text-[#DFD0B8]' : 'text-[#393E46]'}`}>
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:5004/admin/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(credentials),
//       });
//       if (!response.ok) throw new Error('Login failed');
//       const data = await response.json();
//       localStorage.setItem('adminToken', data.token); // Save token to local storage
//       navigate('/dashboard');
//     } catch (error) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

//         {/* Username input */}
//         <div className="mb-4">
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Enter your username"
//             className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             value={credentials.username}
//             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//           />
//         </div>

//         {/* Password input */}
//         <div className="mb-6">
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//             value={credentials.password}
//             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//           />
//         </div>

//         {/* Error message */}
//         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

//         {/* Login button */}
//         <button
//           onClick={handleLogin}
//           className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Login;
