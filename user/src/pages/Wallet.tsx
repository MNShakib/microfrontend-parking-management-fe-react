import React, { useEffect, useState } from 'react';
import '../styles/wallet.css';

const Wallet = () => {
  const token = localStorage.getItem('token');
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState<number | ''>('');
  const [action, setAction] = useState<'add' | 'withdraw'>('add');
  const [message, setMessage] = useState('');

  const fetchBalance = async () => {
    const res = await fetch('http://localhost:4001/api/wallet', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setBalance(data.balance || 0);
  };

  useEffect(() => {
    if (token) fetchBalance();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setMessage('Enter a valid amount.');
      return;
    }

    const endpoint = action === 'add' ? 'add' : 'deduct';
    const res = await fetch(`http://localhost:4001/api/wallet/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount, description: action === 'add' ? 'Top-up' : 'Slot Booking' })
    });

    if (res.ok) {
      setMessage(`₹${amount} ${action === 'add' ? 'added' : 'deducted'} successfully.`);
      setAmount('');
      fetchBalance();
    } else {
      const data = await res.json();
      setMessage(data.message || 'Transaction failed.');
    }
  };

  return (
    <div className="wallet-container">
      <h2>Wallet</h2>
      <div className="balance-box">
        <p>Available Balance</p>
        <span>₹{balance}</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="action-radio">
          <label>
            <input type="radio" checked={action === 'add'} onChange={() => setAction('add')} />
            Add Money
          </label>
          <label>
            <input type="radio" checked={action === 'withdraw'} onChange={() => setAction('withdraw')} />
            Withdraw
          </label>
        </div>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Enter amount"
        />

        <button type="submit">{action === 'add' ? 'Add Money' : 'Withdraw'}</button>

        {message && <p className="wallet-message">{message}</p>}
      </form>
    </div>
  );
};

export default Wallet;
