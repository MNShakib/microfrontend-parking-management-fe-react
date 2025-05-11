// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar: React.FC = () => {
//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between">
//       <h1 className="font-bold">Parking Management</h1>
//       <div className="space-x-4">
//         <Link to="/">Home</Link>
//         <Link to="/admin">Admin</Link>
//         <Link to="/organization">Organization</Link>
//         <Link to="/user/register">User</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <h1 className="font-bold">Parking Management</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/organization">Organization</Link>
        <Link to="/user">User</Link>
      </div>
    </nav>
  );
};

export default Navbar;
