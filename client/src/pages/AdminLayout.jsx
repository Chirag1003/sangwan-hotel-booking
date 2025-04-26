
// import { Outlet } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';

// export default function AdminLayout() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar stays fixed to the left */}
//       <Sidebar />

//       {/* Main content area */}
//       <div className="ml-64 w-full p-6 overflow-y-auto">
//         <Outlet />
//       </div>
//     </div>
//   );
// }
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
