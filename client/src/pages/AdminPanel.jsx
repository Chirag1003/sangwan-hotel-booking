
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AdminPanel() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     const role = localStorage.getItem('role');

//     if (isLoggedIn !== 'true' || role !== 'admin') {
//       alert('❌ Access Denied! You are not authorized to view this page.');
//       navigate('/admin-login');
//       return;
//     }

//     // ✅ Load all bookings from `userBookings`
//     const allUserBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
//     const mergedBookings = Object.values(allUserBookings).flat(); // flatten arrays

//     setBookings(mergedBookings);
//     setLoading(false);

//   }, [navigate]);

//   if (loading) return <div className="text-center mt-10">Loading Bookings...</div>;

//   return (
//     <div className="max-w-7xl mx-auto mt-20 p-4">
//       <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">📋 Admin - All Bookings</h1>
//       {bookings.length === 0 ? (
//         <div className="text-center text-gray-600">No bookings available.</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow rounded-lg">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="py-3 px-4">#</th>
//                 <th className="py-3 px-4">Booked By</th>
//                 <th className="py-3 px-4">Room</th>
//                 <th className="py-3 px-4">Guests</th>
//                 <th className="py-3 px-4">Check-in</th>
//                 <th className="py-3 px-4">Check-out</th>
//                 <th className="py-3 px-4">Total Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-4">{index + 1}</td>
//                   <td className="py-3 px-4">{booking.bookedBy}</td>
//                   <td className="py-3 px-4 capitalize">{booking.roomCategory}</td>
//                   <td className="py-3 px-4">{booking.guests}</td>
//                   <td className="py-3 px-4">{new Date(booking.checkin).toLocaleDateString()}</td>
//                   <td className="py-3 px-4">{new Date(booking.checkout).toLocaleDateString()}</td>
//                   <td className="py-3 px-4 font-bold text-green-700">${booking.totalPrice}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AdminPanel() {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     const role = localStorage.getItem('role');

//     if (isLoggedIn !== 'true' || role !== 'admin') {
//       alert('❌ Access Denied! You are not authorized to view this page.');
//       navigate('/admin-login');
//       return;
//     }

//     loadBookings();
//   }, [navigate]);

//   const loadBookings = () => {
//     const allUserBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
//     const mergedBookings = Object.values(allUserBookings).flat(); // flatten arrays

//     setBookings(mergedBookings);
//     setFilteredBookings(mergedBookings);
//     setLoading(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('role');
//     navigate('/admin-login');
//   };

//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = bookings.filter((booking) =>
//       booking.bookedBy?.toLowerCase().includes(query)
//     );
//     setFilteredBookings(filtered);
//   };

//   const handleDeleteBooking = (bookingToDelete) => {
//     const allUserBookings = JSON.parse(localStorage.getItem('userBookings')) || {};

//     // Find which user made the booking
//     const userEmail = Object.keys(allUserBookings).find((email) =>
//       allUserBookings[email].some((booking) =>
//         booking.checkin === bookingToDelete.checkin &&
//         booking.checkout === bookingToDelete.checkout &&
//         booking.bookedBy === bookingToDelete.bookedBy
//       )
//     );

//     if (userEmail) {
//       // Remove the booking from that user's bookings
//       allUserBookings[userEmail] = allUserBookings[userEmail].filter((booking) =>
//         !(
//           booking.checkin === bookingToDelete.checkin &&
//           booking.checkout === bookingToDelete.checkout &&
//           booking.bookedBy === bookingToDelete.bookedBy
//         )
//       );

//       localStorage.setItem('userBookings', JSON.stringify(allUserBookings));
//       alert('🗑️ Booking deleted successfully!');
//       loadBookings();
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading Bookings...</div>;

//   return (
//     <div className="max-w-7xl mx-auto mt-20 p-4 ">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <h1 className="text-3xl font-bold text-white text-center md:text-left">📋 Admin - All Bookings</h1>
//         <div className="flex flex-col sm:flex-row items-center gap-2">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder="Search by Booked By..."
//             className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {filteredBookings.length === 0 ? (
//         <div className="text-center text-gray-600">No bookings available.</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow rounded-lg">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="py-3 px-4">#</th>
//                 <th className="py-3 px-4">Booked By</th>
//                 <th className="py-3 px-4">Room</th>
//                 <th className="py-3 px-4">Guests</th>
//                 <th className="py-3 px-4">Check-in</th>
//                 <th className="py-3 px-4">Check-out</th>
//                 <th className="py-3 px-4">Total Price</th>
//                 <th className="py-3 px-4">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredBookings.map((booking, index) => (
//                 <tr key={index} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-4">{index + 1}</td>
//                   <td className="py-3 px-4">{booking.bookedBy}</td>
//                   <td className="py-3 px-4 capitalize">{booking.roomCategory}</td>
//                   <td className="py-3 px-4">{booking.guests}</td>
//                   <td className="py-3 px-4">{new Date(booking.checkin).toLocaleDateString()}</td>
//                   <td className="py-3 px-4">{new Date(booking.checkout).toLocaleDateString()}</td>
//                   <td className="py-3 px-4 font-bold text-green-700">${booking.totalPrice}</td>
//                   <td className="py-3 px-4">
//                     <button
//                       onClick={() => handleDeleteBooking(booking)}
//                       className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdminLoggedIn') === 'true';  // ✅ updated to check admin only

    if (!isAdmin) {
      alert('❌ Access Denied! You are not authorized to view this page.');
      navigate('/admin-login');
      return;
    }

    loadBookings();
  }, [navigate]);

  const loadBookings = () => {
    const allUserBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
    const mergedBookings = Object.values(allUserBookings).flat(); // flatten arrays

    setBookings(mergedBookings);
    setFilteredBookings(mergedBookings);
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');  // ✅ only remove admin session
    navigate('/admin-login');
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = bookings.filter((booking) =>
      booking.bookedBy?.toLowerCase().includes(query)
    );
    setFilteredBookings(filtered);
  };

  const handleDeleteBooking = (bookingToDelete) => {
    const allUserBookings = JSON.parse(localStorage.getItem('userBookings')) || {};

    const userEmail = Object.keys(allUserBookings).find((email) =>
      allUserBookings[email].some((booking) =>
        booking.checkin === bookingToDelete.checkin &&
        booking.checkout === bookingToDelete.checkout &&
        booking.bookedBy === bookingToDelete.bookedBy
      )
    );

    if (userEmail) {
      allUserBookings[userEmail] = allUserBookings[userEmail].filter((booking) =>
        !(
          booking.checkin === bookingToDelete.checkin &&
          booking.checkout === bookingToDelete.checkout &&
          booking.bookedBy === bookingToDelete.bookedBy
        )
      );

      localStorage.setItem('userBookings', JSON.stringify(allUserBookings));
      alert('🗑️ Booking deleted successfully!');
      loadBookings();  // Reload updated bookings
    }
  };

  if (loading) return <div className="text-center mt-10">Loading Bookings...</div>;

  return (
    <div className="max-w-7xl mx-auto mt-20 p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-white text-center md:text-left">📋 Admin - All Bookings</h1>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by Booked By..."
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center text-gray-600">No bookings available.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Booked By</th>
                <th className="py-3 px-4">Room</th>
                <th className="py-3 px-4">Guests</th>
                <th className="py-3 px-4">Check-in</th>
                <th className="py-3 px-4">Check-out</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{booking.bookedBy}</td>
                  <td className="py-3 px-4 capitalize">{booking.roomCategory}</td>
                  <td className="py-3 px-4">{booking.guests}</td>
                  <td className="py-3 px-4">{new Date(booking.checkin).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{new Date(booking.checkout).toLocaleDateString()}</td>
                  <td className="py-3 px-4 font-bold text-green-700">${booking.totalPrice}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDeleteBooking(booking)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
