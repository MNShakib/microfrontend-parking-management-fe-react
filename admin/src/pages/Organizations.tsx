import React, { useState, useEffect } from 'react';
import {
  fetchOrganizations,
  approveOrganization,
  rejectOrganization,
} from '../apiService';
import '../styles/Organization.css';

type Organization = {
  _id: string;
  name: string;
  email: string;
  approved: boolean;
  role: string;
  createdAt: string;
};

const Organizations: React.FC = () => {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [error, setError] = useState<string>('');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        if (!token) throw new Error('Unauthorized');
        const organizations = await fetchOrganizations(token);
        setOrgs(organizations);
      } catch (error) {
        setError('Failed to load organizations');
      }
    };

    loadOrganizations();
  }, [token]);

  const handleApprove = async (id: string) => {
    try {
      await approveOrganization(token!, id);
      setOrgs((prev) =>
        prev.map((org) => (org._id === id ? { ...org, approved: true } : org))
      );
    } catch (error) {
      setError('Failed to approve organization');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectOrganization(token!, id);
      setOrgs((prev) => prev.filter((org) => org._id !== id));
    } catch (error) {
      setError('Failed to reject organization');
    }
  };

  return (
    <div className="org-container">
      <h1>Organizations</h1>
      {error && <p className="org-error">{error}</p>}

      <div className="org-grid">
        {orgs.map((org) => (
          <div className="org-card" key={org._id}>
            <h3>{org.name}</h3>
            <p className="email">{org.email}</p>
            <p className="date">Created: {new Date(org.createdAt).toLocaleDateString()}</p>

            {!org.approved ? (
              <div className="action-buttons">
                <button onClick={() => handleApprove(org._id)} className="approve-btn">
                  Approve
                </button>
                <button onClick={() => handleReject(org._id)} className="reject-btn">
                  Reject
                </button>
              </div>
            ) : (
              <span className="approved-tag">Approved</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizations;
