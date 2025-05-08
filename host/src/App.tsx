import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './index.css';

const AdminApp = React.lazy(() => import('admin/AdminApp'));
const OrganizationApp = React.lazy(() => import('org/OrganizationApp'));
const UserApp = React.lazy(() => import('user/UserApp'));

const App = () => {
  return (
    <Router>
      <Navbar />

      {/* Only wrap the route content in Suspense */}
      <div className="min-h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/admin/*" element={<AdminApp />} />
            <Route path="/organization/*" element={<OrganizationApp />} />
            <Route path="/user/*" element={<UserApp />} />
            <Route path="/" element={<div>Welcome to the Host Dashboard</div>} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
