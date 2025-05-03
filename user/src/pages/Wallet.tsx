import React, { useEffect, useState } from 'react';

const Wallet = () => {
  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;
  const userId = user?.userId;

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState<number | ''>('');
  const [action, setAction] = useState<'add' | 'withdraw'>('add');
  const [message, setMessage] = useState('');

  const fetchBalance = async () => {
    if (!userId) return;

    const res = await fetch(`http://localhost:4000/wallets/${userId}`);
    if (res.ok) {
      const data = await res.json();
      setBalance(data.balance || 0);
    } else {
      // Wallet doesn't exist → create new
      await fetch(`http://localhost:4000/wallets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, userId, balance: 0 })
      });
      setBalance(0);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setMessage('Enter a valid amount.');
      return;
    }

    const newBalance = action === 'add' ? balance + amount : balance - amount;
    if (newBalance < 0) {
      setMessage('Insufficient balance.');
      return;
    }

    await fetch(`http://localhost:4000/wallets/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, userId, balance: newBalance })
    });

    setBalance(newBalance);
    setAmount('');
    setMessage(`₹${amount} ${action === 'add' ? 'added' : 'withdrawn'} successfully.`);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Wallet</h2>

      <div className="bg-gray-100 p-4 rounded text-center mb-6">
        <p className="text-sm text-gray-500">Available Balance</p>
        <p className="text-3xl font-bold text-blue-700">₹{balance}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="action" checked={action === 'add'} onChange={() => setAction('add')} />
            Add Money
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="action" checked={action === 'withdraw'} onChange={() => setAction('withdraw')} />
            Withdraw
          </label>
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full p-2 border rounded"
          placeholder="Amount"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          {action === 'add' ? 'Add Money' : 'Withdraw'}
        </button>

        {message && <p className="text-green-600 text-center mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default Wallet;
