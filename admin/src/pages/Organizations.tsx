import React, { useState, useEffect } from 'react';
import {
  fetchOrganizations,
  approveOrganization,
  rejectOrganization,
} from '../apiService';
import './Organization.css';

type Organization = {
  _id: string;
  name: string;
  email: string;
  approved: boolean;
  role: string;
  createdAt: string;
};

type Theme = 'dark' | 'light';

// Main Organizations component
const Organizations: React.FC = () => {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [filteredOrgs, setFilteredOrgs] = useState<Organization[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [theme, setTheme] = useState<Theme>('dark');
  const token = localStorage.getItem('adminToken');

  // Initialize theme
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('adminTheme');
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme as Theme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme to document body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('adminTheme', theme);
    window.dispatchEvent(new Event('themeChanged'));
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      if (!token) throw new Error('Unauthorized');
      const organizations = await fetchOrganizations(token);
      setOrgs(organizations);
      setFilteredOrgs(organizations);
      setError('');
    } catch (err) {
      setError('Failed to load organizations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, [token]);

  useEffect(() => {
    // Apply filters and search
    let result = [...orgs];
    
    // Apply status filter
    if (filter === 'approved') {
      result = result.filter(org => org.approved);
    } else if (filter === 'pending') {
      result = result.filter(org => !org.approved);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        org => org.name.toLowerCase().includes(term) || 
               org.email.toLowerCase().includes(term)
      );
    }
    
    setFilteredOrgs(result);
  }, [orgs, filter, searchTerm]);

  const handleApprove = async (id: string) => {
    try {
      await approveOrganization(token!, id);
      setOrgs(prev =>
        prev.map(org => (org._id === id ? { ...org, approved: true } : org))
      );
    } catch (err) {
      setError('Failed to approve organization');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectOrganization(token!, id);
      setOrgs(prev => prev.filter(org => org._id !== id));
    } catch (err) {
      setError('Failed to reject organization');
    }
  };

  const handleRefresh = () => {
    loadOrganizations();
  };

  // Calculate stats
  const totalOrgs = orgs.length;
  const approvedOrgs = orgs.filter(org => org.approved).length;
  const pendingOrgs = totalOrgs - approvedOrgs;

  // Main render
  return (
    <div className={`org-container ${theme}`}>
      <div className="dashboard-header">
        <h1>Organizations</h1>
        <div className="dashboard-actions">
          <button onClick={handleRefresh} className="refresh-btn" aria-label="Refresh">
            ↻ Refresh
          </button>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {error && <div className="error-alert">{error}</div>}
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <span className="stat-value">{totalOrgs}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{approvedOrgs}</span>
          <span className="stat-label">Approved</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{pendingOrgs}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>
      
      <div className="dashboard-filters">
        <div className="search-container">
          <input 
            type="text"
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
            onClick={() => setFilter('approved')}
          >
            Approved
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading organizations...</p>
        </div>
      ) : filteredOrgs.length === 0 ? (
        <div className="empty-state">
          <p>No organizations found</p>
        </div>
      ) : (
        <div className="org-grid">
          {filteredOrgs.map(org => (
            <div className="org-card" key={org._id}>
              <div className="org-card-header">
                <h3 className="org-name">{org.name}</h3>
                {org.approved && <span className="approved-tag">✓ Approved</span>}
              </div>
              
              <div className="org-card-body">
                <p className="org-email">{org.email}</p>
                <p className="org-date">
                  Created: {new Date(org.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              {!org.approved && (
                <div className="action-buttons">
                  <button onClick={() => handleApprove(org._id)} className="approve-btn">
                    ✓ Approve
                  </button>
                  <button onClick={() => handleReject(org._id)} className="reject-btn">
                    ✕ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Organizations;