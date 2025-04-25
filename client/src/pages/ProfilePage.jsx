import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming JWT stored in localStorage
          },
        });

        const profileData = await userRes.json();
        setProfile(profileData);

        const bookingsRes = await fetch(`http://localhost:5000/api/users/bookings/${profileData._id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h2>Welcome, {profile.firstName} {profile.lastName}</h2>
        <p>{profile.email}</p>
      </div>

      <div className="bookings-section">
        <h3>Your Bookings</h3>
        {bookings.length > 0 ? (
          <div className="booking-list">
            {bookings.map((booking, index) => (
              <div key={index} className="booking-card">
                <h4>Room: {booking.roomCategory}</h4>
                <p>Check-in: {new Date(booking.checkin).toLocaleDateString()}</p>
                <p>Check-out: {new Date(booking.checkout).toLocaleDateString()}</p>
                <p>Total Price: ${booking.totalPrice}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no past bookings.</p>
        )}
      </div>
      
      <button onClick={() => navigate('/')} className="go-home-btn">Go to Home</button>
    </div>
  );
}
