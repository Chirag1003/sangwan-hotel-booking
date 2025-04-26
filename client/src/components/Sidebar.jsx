// import { NavLink } from 'react-router-dom';

// export default function Sidebar() {
//   return (
//     <div className="h-screen w-64 bg-gray-900 text-white p-6 fixed top-0 left-0">
//       <h2 className="text-xl font-bold mb-6">SANGWAN HOTEL</h2>
//       <ul className="space-y-4">
//         <li><NavLink to="/admin/dashboard" activeClassName="font-bold">Dashboard</NavLink></li>
//         <li><NavLink to="/admin/users" activeClassName="font-bold">Users</NavLink></li>
//         <li><NavLink to="/admin/rooms" activeClassName="font-bold">Rooms</NavLink></li>
//         <li><NavLink to="/admin/meals" activeClassName="font-bold">Meals</NavLink></li>
//         <li><NavLink to="/admin/bookings" activeClassName="font-bold">Bookings</NavLink></li>
//         <li>
//           <button
//             onClick={() => {
//               localStorage.removeItem('isAdminLoggedIn');
//               window.location.href = '/admin-login';
//             }}
//             className="text-red-400"
//           >
//             Logout
//           </button>
//         </li>
//       </ul>
//     </div>
//   );
// }
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6 fixed top-0 left-0 shadow-lg z-50">
      <h2 className="text-2xl font-bold mb-10 tracking-wide">SANGWAN HOTEL</h2>

      <ul className="space-y-5">
        <li>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-400'
                : 'hover:text-blue-300 transition'
            }
          >
            🏠 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-400'
                : 'hover:text-blue-300 transition'
            }
          >
            👤 Users
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/rooms"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-400'
                : 'hover:text-blue-300 transition'
            }
          >
            🛏️ Rooms
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/meals"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-400'
                : 'hover:text-blue-300 transition'
            }
          >
            🍽️ Meals
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/bookings"
            className={({ isActive }) =>
              isActive
                ? 'font-bold text-blue-400'
                : 'hover:text-blue-300 transition'
            }
          >
            📅 Bookings
          </NavLink>
        </li>

        <li>
          <button
            onClick={() => {
              localStorage.removeItem('isAdminLoggedIn');
              window.location.href = '/admin-login';
            }}
            className="text-red-400 hover:text-red-300 transition"
          >
            🚪 Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
