// import { useEffect, useState } from 'react';

// export default function AdminDashboard() {
//   const [stats, setStats] = useState({ users: 0, rooms: 0, bookings: 0 });

//   useEffect(() => {
//     const fetchStats = async () => {
//       const users = await fetch('/api/users').then(res => res.json());
//       const rooms = await fetch('/api/rooms').then(res => res.json());
//       const bookings = await fetch('/api/bookings').then(res => res.json());
      

//       setStats({ users: users.length, rooms: rooms.length, bookings: bookings.length });
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className=" p-6">
//       <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
//       <div className="grid grid-cols-3 gap-6">
//         <StatBox label="Users" value={stats.users} />
//         <StatBox label="Rooms" value={stats.rooms} />
//         <StatBox label="Bookings" value={stats.bookings} />
//       </div>
//     </div>
//   );
// }

// function StatBox({ label, value }) {
//   return (
//     <div className="bg-white rounded shadow p-4 text-center">
//       <h3 className="text-lg font-semibold">{label}</h3>
//       <p className="text-2xl text-blue-600 font-bold">{value}</p>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, rooms: 0, bookings: 0, meals: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const users = await fetch('/api/users').then(res => res.json());
      const rooms = await fetch('/api/rooms').then(res => res.json());
      const bookings = await fetch('/api/bookings').then(res => res.json());
      const meals = await fetch('/api/meals').then(res => res.json());

      setStats({
        users: users.length,
        rooms: rooms.length,
        bookings: bookings.length,
        meals: Array.isArray(meals) ? meals.length : 0, // handle if /meals returns array or object
      });
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatBox label="Users" value={stats.users} />
        <StatBox label="Rooms" value={stats.rooms} />
        <StatBox label="Bookings" value={stats.bookings} />
        <StatBox label="Meals" value={stats.meals} /> {/* ✅ New box for Meals */}
      </div>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="bg-white rounded shadow p-4 text-center">
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-2xl text-blue-600 font-bold">{value}</p>
    </div>
  );
}
