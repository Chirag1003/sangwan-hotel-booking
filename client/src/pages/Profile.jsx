import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Star rating component
const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (index) => {
    if (onRatingChange) onRatingChange(index + 1);
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

    // ✅ Fetch bookings from backend
    fetch(`http://localhost:5000/api/bookings/user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Bookings fetched from backend:', data); // ✅ Show fetched data in console
        if (Array.isArray(data)) {
          const ratings = JSON.parse(localStorage.getItem('bookingRatings')) || {};
          const enrichedBookings = data.map((booking) => ({
            ...booking,
            rating: ratings[booking._id] || 0,
          }));
          setBookings(enrichedBookings);
        } else {
          console.error('Bookings API did not return an array:', data);
          setBookings([]);
        }
      })
      .catch((err) => {
        console.error('Failed to load bookings:', err);
        setBookings([]);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    alert('👋 You have logged out successfully!');
    navigate('/');
    window.location.reload();
  };

  const handleRatingChange = (bookingId, rating) => {
    const updatedBookings = bookings.map((booking) =>
      booking._id === bookingId ? { ...booking, rating } : booking
    );
    setBookings(updatedBookings);

    const ratings = JSON.parse(localStorage.getItem('bookingRatings')) || {};
    ratings[bookingId] = rating;
    localStorage.setItem('bookingRatings', JSON.stringify(ratings));
  };

  if (!userDetails) return null; // If no user, don't render

  return (
    <div className="p-6 bg-gray-100 mt-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6">
        
        {/* User Info */}
        <div className="text-center bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-black">
            Hi, {userDetails.firstName || userDetails.email}
          </h2>
          <div className="text-gray-500">{userDetails.email}</div>
        </div>

        {/* Bookings Section */}
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
                <div
                  key={booking._id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                >
                  <h4 className="text-xl font-medium text-gray-800">Booking #{index + 1}</h4>
                  <p className="text-gray-600"><strong>Check-in:</strong> {new Date(booking.checkin).toLocaleDateString()}</p>
                  <p className="text-gray-600"><strong>Check-out:</strong> {new Date(booking.checkout).toLocaleDateString()}</p>
                  <p className="text-gray-600"><strong>Room Type:</strong> {booking.roomCategory}</p>
                  <p className="text-gray-600"><strong>Guests:</strong> {booking.guests}</p>
                  <p className="text-gray-600"><strong>Total Price:</strong> ${booking.totalPrice}</p>

                  {/* Meals */}
                  {booking.meals && (
                    <div className="text-gray-600 mt-2">
                      <strong>Meals:</strong>
                      <ul className="list-disc ml-6">
                        {Object.entries(booking.meals).map(([meal, qty]) => (
                          <li key={meal}>
                            {meal}: {qty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="mt-4">
                    <p className="text-gray-600"><strong>Rate Your Stay:</strong></p>
                    <StarRating
                      rating={booking.rating || 0}
                      onRatingChange={(rating) => handleRatingChange(booking._id, rating)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Logout Button */}
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
