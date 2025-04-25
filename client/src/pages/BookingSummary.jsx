// import { useLocation, useNavigate } from 'react-router-dom';

// export default function BookingSummary() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const bookingData = location.state;

//   if (!bookingData) {
//     return (
//       <div className="text-center mt-10 text-xl">
//         No booking data found.{" "}
//         <button onClick={() => navigate('/booking')} className="text-blue-600 underline">
//           Go back to booking page
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
//       <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">✅ Booking Summary</h2>

//       <ul className="space-y-2 text-lg">
//         <li><strong>Room Category:</strong> {bookingData.roomCategory.charAt(0).toUpperCase() + bookingData.roomCategory.slice(1)}</li>
//         <li><strong>Guests:</strong> {bookingData.guests}</li>
//         <li><strong>Check-in:</strong> {new Date(bookingData.checkin).toDateString()}</li>
//         <li><strong>Check-out:</strong> {new Date(bookingData.checkout).toDateString()}</li>
//         <li><strong>Breakfasts Ordered:</strong> {bookingData.breakfast}</li>
//         <li><strong>Dinners Ordered:</strong> {bookingData.dinner}</li>
//         <li><strong>Total Price:</strong> ${bookingData.totalPrice}</li>
//       </ul>

//       <div className="pt-4">
//         <h3 className="text-xl font-semibold">Guest Details:</h3>
//         <ul className="mt-2 space-y-1">
//           {bookingData.guestDetails?.map((guest, index) => (
//             <li key={index}>• {guest.name} (Age: {guest.age})</li>
//           ))}
//         </ul>
//       </div>

//       <div className="text-center mt-6">
//         <button onClick={() => navigate('/booking')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
//           Book Another Room
//         </button>
//       </div>
//     </div>
//   );
// }
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookingSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state; // Data passed through `navigate`
  console.log("Booking Summary Data:", bookingData);
  if (!bookingData) {
    return (
      <div className="text-center mt-10 text-xl">
        No booking data found.{" "}
        <button onClick={() => navigate('/booking')} className="text-blue-600 underline">
          Go back to booking page
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto my-24 bg-white shadow-lg p-6 rounded-lg">
      <div className='flex justify-end'>
              <button
                onClick={() => navigate('/')}
                className="top-4 right-4 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
              >
                X
              </button>
            </div>
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">✅ Booking Summary</h2>

      <ul className="space-y-2 text-lg">
        <li><strong>Room Category:</strong> {bookingData.roomCategory.charAt(0).toUpperCase() + bookingData.roomCategory.slice(1)}</li>
        <li><strong>Guests:</strong> {bookingData.guests}</li>
        <li><strong>Check-in:</strong> {new Date(bookingData.checkin).toDateString()}</li>
        <li><strong>Check-out:</strong> {new Date(bookingData.checkout).toDateString()}</li>
        <li><strong>Breakfasts Ordered:</strong> {bookingData.breakfast}</li>
        <li><strong>Dinners Ordered:</strong> {bookingData.dinner}</li>
        <li><strong>Total Price:</strong> ${bookingData.totalPrice}</li>
      </ul>

      <div className="pt-4">
        <h3 className="text-xl font-semibold">Guest Details:</h3>
        <ul className="mt-2 space-y-1">
          {bookingData.guestDetails?.map((guest, index) => (
            <li key={index}>• {guest.name} (Age: {guest.age})</li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-6">
        <button onClick={() => navigate('/booking')} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Book Another Room
        </button>
      </div>
    </div>
  );
}
