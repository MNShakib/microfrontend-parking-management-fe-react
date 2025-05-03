import React, { useEffect, useState } from 'react';

// Step 1: Define a proper TypeScript type
type Organization = {
  id: string;
  name: string;
  country: string;
  state: string;
  city: string;
  status: 'pending' | 'approved' | 'rejected';
};

const Organizations: React.FC = () => {
  // Step 2: Use the type in useState
  const [orgs, setOrgs] = useState<Organization[]>([]);

  // Step 3: Fetch data from json-server
  useEffect(() => {
    fetch('http://localhost:4003/organizations')
      .then((res) => res.json())
      .then((data: Organization[]) => setOrgs(data))
      .catch((err) => console.error(err));
  }, []);

  // Step 4: Handle approve/reject action
  const handleStatusChange = async (id: string, status: Organization['status']) => {
    try {
      await fetch(`http://localhost:4003/organizations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      // Optimistically update local state
      setOrgs((prev) =>
        prev.map((org) =>
          org.id === id ? { ...org, status } : org
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Organizations</h2>
      <div className="grid grid-cols-1 gap-4">
        {orgs.map((org) => (
          <div key={org.id} className="bg-white p-4 shadow rounded">
            <div className="flex justify-between">
              <div>
                <p className="text-lg font-semibold">{org.name} ({org.id})</p>
                <p className="text-sm text-gray-600">{org.city}, {org.state}, {org.country}</p>
              </div>
              <div className="flex items-center space-x-2">
                {org.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleStatusChange(org.id, 'approved')}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(org.id, 'rejected')}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className={`px-3 py-1 rounded text-white ${org.status === 'approved' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {org.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizations;
