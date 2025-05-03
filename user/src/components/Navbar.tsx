import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between">
        <div className="font-bold text-lg">Parking User Panel</div>
        <div className="space-x-4">
            <Link to="/user/dashboard/profile" className="block hover:text-blue-200">👤 My Profile</Link>
            <Link to="/user/dashboard/book" className="block hover:text-blue-200">🚗 Book Slot</Link>
            <Link to="/user/dashboard/wallet" className="block hover:text-blue-200">💰 Wallet</Link>
            <Link to="/user/dashboard/history" className="block hover:text-blue-200">📜 Booking History</Link>
        </div>
    </nav>
);

export default Navbar;
