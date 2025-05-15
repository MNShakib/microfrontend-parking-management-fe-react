import React, { useEffect, useState } from 'react';

interface Transaction {
  _id: string;
  type: string;
  amount: number;
  description: string;
  createdAt: string;
}

const History = () => {
  const token = localStorage.getItem('token');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await fetch('http://localhost:4001/api/wallet/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTransactions(data);
    };
    if (token) fetchHistory();
  }, [token]);

  return (
    <div className="p-6 md:ml-[220px] min-h-screen transition-colors duration-300 bg-white dark:bg-[#070F2B] text-black dark:text-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Wallet Transactions</h2>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 dark:border-[#535C91]">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-[#535C91]">
          <thead className="bg-[#BCCCDC] dark:bg-[#535C91] text-left text-sm uppercase font-medium">
            <tr>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-[#1B1A55] divide-y divide-gray-100 dark:divide-[#9290C3]">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-[#D9EAFD] dark:hover:bg-[#535C91] transition">
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{tx.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{tx.amount}</td>
                  <td className="px-6 py-4">{tx.description}</td>
                  <td className="px-6 py-4">{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center px-6 py-10 text-gray-500 dark:text-gray-300">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
