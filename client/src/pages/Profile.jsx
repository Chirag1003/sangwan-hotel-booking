
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// // Helper function to create star rating
// const StarRating = ({ rating, onRatingChange }) => {
//   const handleClick = (starIndex) => {
//     if (onRatingChange) {
//       onRatingChange(starIndex + 1); // Update the rating (1-based index)
//     }
//   };

//   return (
//     <div className="flex space-x-1">
//       {[1, 2, 3, 4, 5].map((star, index) => (
//         <svg
//           key={index}
//           onClick={() => handleClick(index)}
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill={index < rating ? 'gold' : 'gray'}
//           className="cursor-pointer"
//         >
//           <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
//         </svg>
//       ))}
//     </div>
//   );
// };

// export default function Profile() {
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     // Fetch user details from localStorage
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user) {
//       setUserDetails(user);
//     }

//     // Fetch past bookings from localStorage
//     const userBookings = JSON.parse(localStorage.getItem('bookings')) || [];
//     setBookings(userBookings);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('user');
//     alert('👋 You have logged out successfully!');
//     navigate('/');
//     window.location.reload(); // Refresh the page after logout
//   };

//   const handleRatingChange = (index, rating) => {
//     const updatedBookings = [...bookings];
//     updatedBookings[index].rating = rating; // Save the rating to the specific booking
//     setBookings(updatedBookings);
//     localStorage.setItem('bookings', JSON.stringify(updatedBookings)); // Save updated bookings to localStorage
//   };

//   // If no user is logged in, redirect to login page
//   if (!userDetails) {
//     navigate('/login');
//     return null; // Don't render the profile if there's no user
//   }

//   return (
//     <div className="p-6 bg-gray-100 mt-20">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
//         {/* User Info */}
//         <div className="text-center bg-gray-50 p-6 rounded-lg shadow-md">
//           <h2 className="text-3xl font-semibold text-black">Hi, {userDetails.firstName || userDetails.email}</h2>
//           <div className="mt-4">
//             {/* <div className="text-xl font-medium text-gray-800"></div> */}
//             <div className="text-gray-500">{userDetails.email}</div>
//           </div>
//         </div>

//         {/* Past Bookings */}
//         <div>
         
//           <h2 className="text-4xl font-semibold text-center ">Your Bookings</h2>
        
//           <div className="mt-6 text-center">
//         <p className="text-lg font-medium text-gray-700 mx-30 mb-6">
//         Want to revisit your previous stays? Check out your past bookings here and relive the memories of your time at Sangwan Hotel! Don’t forget to rate your experience!        </p>
//       </div>
//           {bookings.length === 0 ? (
//             <p className="text-center text-gray-500">You have no past bookings.</p>
//           ) : (
//             <div className="space-y-4 mt-4">
//               {bookings.map((booking, index) => (
//                 <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
//                   <h4 className="text-xl font-medium text-gray-800">Booking #{index + 1}</h4>
//                   <p className="text-gray-600"><strong>Check-in:</strong> {booking.checkin}</p>
//                   <p className="text-gray-600"><strong>Check-out:</strong> {booking.checkout}</p>
//                   <p className="text-gray-600"><strong>Room Type:</strong> {booking.roomCategory}</p>
//                   <p className="text-gray-600"><strong>Guests:</strong> {booking.guests}</p>
//                   <p className="text-gray-600"><strong>Total Price:</strong> ${booking.totalPrice}</p>
                  
//                   {/* Rating */}
//                   <div className="mt-4">
//                     <p className="text-gray-600"><strong>Rate Your Stay:</strong></p>
//                     <StarRating
//                       rating={booking.rating || 0} // Default rating is 0 if not yet rated
//                       onRatingChange={(rating) => handleRatingChange(index, rating)}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Logout Button */}
//         <div className="flex justify-center mt-6">
//           <button
//             onClick={handleLogout}
//             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (starIndex) => {
    if (onRatingChange) onRatingChange(starIndex + 1);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star, index) => (
        <svg
          key={index}
          onClick={() => handleClick(index)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={index < rating ? 'gold' : 'gray'}
          className="cursor-pointer"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
};

export default function Profile() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUserDetails(user);

    const allBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
    const userBookings = allBookings[user.email] || [];
    setBookings(userBookings);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    alert('👋 You have logged out successfully!');
    navigate('/');
    window.location.reload();
  };

  const handleRatingChange = (index, rating) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].rating = rating;
    setBookings(updatedBookings);

    const allBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
    const userEmail = userDetails?.email;
    allBookings[userEmail] = updatedBookings;
    localStorage.setItem('userBookings', JSON.stringify(allBookings));
  };

  return (
    <div className="p-6 bg-gray-100 mt-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
        <div className="text-center bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-black">Hi, {userDetails?.firstName || userDetails?.email}</h2>
          <div className="text-gray-500">{userDetails?.email}</div>
        </div>

        <div>
          <h2 className="text-4xl font-semibold text-center">Your Bookings</h2>
          <div className="mt-6 text-center">
            <p className="text-lg font-medium text-gray-700 mb-6">
              Want to revisit your previous stays? Check out your past bookings here and relive the memories of your time at Sangwan Hotel! Don’t forget to rate your experience!
            </p>
          </div>

          {bookings.length === 0 ? (
            <p className="text-center text-gray-500">You have no past bookings.</p>
          ) : (
            <div className="space-y-4 mt-4">
              {bookings.map((booking, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h4 className="text-xl font-medium text-gray-800">Booking #{index + 1}</h4>
                  <p className="text-gray-600"><strong>Check-in:</strong> {booking.checkin}</p>
                  <p className="text-gray-600"><strong>Check-out:</strong> {booking.checkout}</p>
                  <p className="text-gray-600"><strong>Room Type:</strong> {booking.roomCategory}</p>
                  <p className="text-gray-600"><strong>Guests:</strong> {booking.guests}</p>
                  <p className="text-gray-600"><strong>Total Price:</strong> ${booking.totalPrice}</p>

                  <div className="mt-4">
                    <p className="text-gray-600"><strong>Rate Your Stay:</strong></p>
                    <StarRating
                      rating={booking.rating || 0}
                      onRatingChange={(rating) => handleRatingChange(index, rating)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
