import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 bg-blue-700 text-white h-screen p-6">
    <h2 className="text-2xl font-bold mb-6">Org Menu</h2>
    <nav className="space-y-4">
      <Link to="/dashboard/levels" className="block hover:text-gray-200">Manage Levels</Link>
      <Link to="/dashboard/slots" className="block hover:text-gray-200">Manage Slots</Link>
      <Link to="/dashboard/analytics" className="block hover:text-gray-200">Analytics</Link>
    </nav>
  </aside>
);

export default Sidebar;