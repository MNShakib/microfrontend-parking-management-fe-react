import { Link } from 'react-router-dom';

const Sidebar = () => (
  <aside className="w-64 bg-blue-700 text-white h-full p-6">
    <h2 className="text-2xl font-bold mb-8">Admin</h2>
    <nav className="space-y-4">
      <Link to="/dashboard" className="block hover:text-gray-200">Organizations</Link>
      <Link to="/dashboard/add" className="block hover:text-gray-200">Add Organization</Link>
    </nav>
  </aside>
);

export default Sidebar;