// apiService.ts
const API_URL = 'http://localhost:5004/admin'; // Backend URL

// Fetch organizations
export const fetchOrganizations = async (token: string) => {
  const response = await fetch(`${API_URL}/organizations`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch organizations');
  return response.json();
};

// Approve organization
export const approveOrganization = async (token: string, id: string) => {
  const response = await fetch(`${API_URL}/approve/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to approve organization');
  return response.json();
};

// Reject organization
export const rejectOrganization = async (token: string, id: string) => {
  const response = await fetch(`${API_URL}/reject/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to reject organization');
  return response.json();
};

// Fetch stats
export const fetchStats = async (token: string) => {
  const response = await fetch(`${API_URL}/stats`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch stats');
  return response.json();
};

// Register a new organization
export const registerOrganization = async (token: string, organizationData: any) => {
    const response = await fetch(`${API_URL}/register-organization`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the token to the backend
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(organizationData), // Send the form data
    });
  
    if (!response.ok) throw new Error('Failed to register organization');
    return response.json(); // Return the response data
  };
