import React from 'react';
import  ReactDOM  from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';

const App = () => {
  return (
    <Router basename="/admin">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

// const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
// root.render(<App />);
export default App;