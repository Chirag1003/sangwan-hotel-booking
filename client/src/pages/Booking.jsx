import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../components/BookingForm';

export default function Booking() {
  const navigate = useNavigate();

  // 🔐 Block guests from booking
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      alert('❌ Please login to book a room.');
      navigate('/login');
    }
  }, [navigate]);

  // ✅ Handle booking submission
  const handleBookingSubmit = async (data) => {
    const checkIn = new Date(data.checkin);
    const checkOut = new Date(data.checkout);
    const nights = Math.max(Math.ceil((checkOut - checkIn) / (1000 * 3600 * 24)), 1);
    const roomPrices = { single: 100, double: 150, triple: 200 };
    const totalPrice = roomPrices[data.roomCategory] * nights + (data.breakfast * 20) + (data.dinner * 30);

    const bookingPayload = { ...data, totalPrice };
    console.log('📦 Booking Payload:', bookingPayload);

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Booking saved:', result);
        navigate('/summary', { state: result });
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      console.error('❌ Booking error:', error);
      alert('Something went wrong while saving the booking.');
    }
  };

  return (
    <div className="p-2 pt-24">
      <BookingForm onSubmit={handleBookingSubmit} />
    </div>
  );
}
