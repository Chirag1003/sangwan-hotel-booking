
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function BookingForm() {
//   const navigate = useNavigate();
//   const currentUser = JSON.parse(localStorage.getItem('user'));

//   const [formData, setFormData] = useState({
//     guests: 1,
//     checkin: '',
//     checkout: '',
//     roomCategory: 'single',
//     breakfast: 0,
//     dinner: 0,
//     paymentMethod: 'cash',
//   });

//   const [guestDetails, setGuestDetails] = useState([{ name: '', age: '' }]);
//   const [rooms, setRooms] = useState([]);
//   const [error, setError] = useState('');
//   const [mealPrices, setMealPrices] = useState({
//     breakfast: 20,
//     dinner: 30,
//   });

//   const roomPrices = { single: 100, double: 150, triple: 200 };
//   const roomGuestLimits = { single: 2, double: 4, triple: Infinity };

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     const val = type === 'number' ? parseInt(value, 10) || 0 : value;

//     setFormData((prev) => ({ ...prev, [name]: val }));

//     if (name === 'guests') {
//       const newCount = parseInt(val, 10);
//       const updatedDetails = [...guestDetails];
//       if (newCount > guestDetails.length) {
//         for (let i = guestDetails.length; i < newCount; i++) {
//           updatedDetails.push({ name: '', age: '' });
//         }
//       } else {
//         updatedDetails.length = newCount;
//       }
//       setGuestDetails(updatedDetails);
//       validateGuestLimit(newCount, formData.roomCategory);
//     }

//     if (name === 'roomCategory') {
//       validateGuestLimit(formData.guests, val);
//     }
//   };
//   useEffect(() => {
//     // fetch rooms
//     fetch('/api/rooms')
//       .then((res) => res.json())
//       .then((data) => setRooms(data));
  
//     // fetch meals
//     fetch('/api/meals')
//       .then((res) => res.json())
//       .then((data) => {
//         setMealPrices({
//           breakfast: data.breakfast || 20,
//           dinner: data.dinner || 30,
//         });
//       });
//   }, []);
//   const validateGuestLimit = (guestCount, roomType) => {
//     const maxAllowed = roomGuestLimits[roomType];
//     if (guestCount > maxAllowed) {
//       setError(`❌ ${roomType} room allows only up to ${maxAllowed} guest(s).`);
//     } else {
//       setError('');
//     }
//   };

//   const handleGuestDetailChange = (index, field, value) => {
//     const updatedGuests = [...guestDetails];
//     updatedGuests[index][field] = value;
//     setGuestDetails(updatedGuests);
//   };

//   const calculateNights = () => {
//     if (!formData.checkin || !formData.checkout) return 0;
//     const checkIn = new Date(formData.checkin);
//     const checkOut = new Date(formData.checkout);
//     const diffTime = checkOut - checkIn;
//     const nights = Math.ceil(diffTime / (1000 * 3600 * 24));
//     return nights > 0 ? nights : 1;
//   };

//   const calculateTotalPrice = () => {
//     const nights = calculateNights();
//     const roomRate = roomPrices[formData.roomCategory];
//     const roomTotal = roomRate * nights;
//     const mealsTotal = (20 * formData.breakfast) + (30 * formData.dinner);
//     return roomTotal + mealsTotal;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const maxGuests = roomGuestLimits[formData.roomCategory];

//     if (formData.guests > maxGuests) {
//       setError(`❌ Max ${maxGuests} guests allowed in a ${formData.roomCategory} room.`);
//       return;
//     }

//     const newBooking = {
//       ...formData,
//       guestDetails,
//       totalPrice: calculateTotalPrice(),
//       bookedBy: currentUser?.firstName || currentUser?.email || 'Unknown User',
      
//     };

//     const allBookings = JSON.parse(localStorage.getItem('userBookings')) || {};
//     const userEmail = currentUser?.email || 'unknown@example.com';

//     if (!allBookings[userEmail]) allBookings[userEmail] = [];
//     allBookings[userEmail].push(newBooking);

//     localStorage.setItem('userBookings', JSON.stringify(allBookings));
//     navigate('/booking-summary', { state: newBooking });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl max-w-2xl mx-auto space-y-6 border border-gray-200"
//     >
//       {/* Modal overlay */}
//       <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//         <div
//           className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-y-auto"
//           style={{ maxHeight: '90vh', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//         >
//           <div className="p-6">

//             {/* Close button */}
//             <div className="flex justify-end">
//               <button
//                 type="button"
//                 onClick={() => navigate('/')}
//                 className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
//               >
//                 ✖
//               </button>
//             </div>

//             {/* Heading */}
//             <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-2">
//               Room Booking Form
//             </h2>

//             {/* Error display */}
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-center">
//                 {error}
//               </div>
//             )}

//             {/* Form Inputs */}
//             {/* Guests and Room Category */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Guests</label>
//                 <input
//                   type="number"
//                   name="guests"
//                   value={formData.guests}
//                   min="1"
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Room Category</label>
//                 {/* <select
//                   name="roomCategory"
//                   value={formData.roomCategory}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 >
//                   <option value="single">Single - $100</option>
//                   <option value="double">Double - $150</option>
//                   <option value="triple">Triple - $200</option>
//                 </select> */}
//                 <select
//   name="roomCategory"
//   value={formData.roomCategory}
//   onChange={handleChange}
//   className="w-full border border-gray-300 p-3 rounded-lg"
// >
//   {rooms.map((room) => (
//     <option key={room._id} value={room.title}>
//       {room.title} - ${room.price}
//     </option>
//   ))}
// </select>

//               </div>
//             </div>

//             {/* Dates */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Check-in Date</label>
//                 <input
//                   type="date"
//                   name="checkin"
//                   value={formData.checkin}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Check-out Date</label>
//                 <input
//                   type="date"
//                   name="checkout"
//                   value={formData.checkout}
//                   onChange={handleChange}
//                   required
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Meal Selection */}
//             <div className="bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 space-y-3 my-2">
//               <p className="font-semibold text-gray-700">Meal Options (per guest):</p>
//               <div className="flex items-center space-x-4">
//                 <label className="w-1/2 text-gray-700 font-medium">Breakfast ($20)</label>
//                 <input
//                   type="number"
//                   name="breakfast"
//                   value={formData.breakfast}
//                   onChange={handleChange}
//                   min="0"
//                   className="w-1/2 border border-gray-300 p-2 rounded-md"
//                 />
//               </div>
//               <div className="flex items-center space-x-4">
//                 <label className="w-1/2 text-gray-700 font-medium">Dinner ($30)</label>
//                 <input
//                   type="number"
//                   name="dinner"
//                   value={formData.dinner}
//                   onChange={handleChange}
//                   min="0"
//                   className="w-1/2 border border-gray-300 p-2 rounded-md"
//                 />
//               </div>
//             </div>

//             {/* Guest Details */}
//             <div className="space-y-4 bg-blue-50 p-4 rounded-xl border border-blue-200">
//               <h3 className="text-xl font-semibold text-blue-700">Guest Details</h3>
//               {guestDetails.map((guest, index) => (
//                 <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block font-medium text-gray-700 mb-1">Guest {index + 1} Name</label>
//                     <input
//                       type="text"
//                       value={guest.name}
//                       onChange={(e) => handleGuestDetailChange(index, 'name', e.target.value)}
//                       placeholder="Full Name"
//                       className="w-full border border-gray-300 p-2 rounded-md"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-medium text-gray-700 mb-1">Guest {index + 1} Age</label>
//                     <input
//                       type="number"
//                       value={guest.age}
//                       onChange={(e) => handleGuestDetailChange(index, 'age', e.target.value)}
//                       placeholder="Age"
//                       min="1"
//                       className="w-full border border-gray-300 p-2 rounded-md"
//                       required
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Summary */}
//             {formData.checkin && formData.checkout && (
//               <div className="text-center text-sm text-gray-500 mt-4">
//                 Stay Duration: {calculateNights()} night(s)
//               </div>
//             )}
//             <div className="text-center text-xl font-bold text-green-600">
//               Total Price: ${calculateTotalPrice()}
//             </div>

//             {/* Submit Button */}
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
//               >
//                 Submit Booking
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </form>
//   );
// }
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingForm() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    guests: 1,
    checkin: '',
    checkout: '',
    roomCategory: '',
    paymentMethod: 'cash',
  });

  const [guestDetails, setGuestDetails] = useState([{ name: '', age: '' }]);
  const [rooms, setRooms] = useState([]);
  const [meals, setMeals] = useState([]); // fetched meals [{name, price}]
  const [mealQuantities, setMealQuantities] = useState({}); // {parathe: 2, pizza: 1}
  const [error, setError] = useState('');

  const roomGuestLimits = { single: 2, double: 4, triple: Infinity };

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        if (data.length && !formData.roomCategory) {
          setFormData((prev) => ({ ...prev, roomCategory: data[0].title }));
        }
      });

    fetch('/api/meals')
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        const initialQuantities = {};
        data.forEach((meal) => {
          initialQuantities[meal.name] = 0;
        });
        setMealQuantities(initialQuantities);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'number' ? parseInt(value, 10) || 0 : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (name === 'guests') {
      const newCount = parseInt(val, 10);
      const updatedDetails = [...guestDetails];
      if (newCount > guestDetails.length) {
        for (let i = guestDetails.length; i < newCount; i++) {
          updatedDetails.push({ name: '', age: '' });
        }
      } else {
        updatedDetails.length = newCount;
      }
      setGuestDetails(updatedDetails);
      validateGuestLimit(newCount, formData.roomCategory);
    }

    if (name === 'roomCategory') {
      validateGuestLimit(formData.guests, val);
    }
  };

  const validateGuestLimit = (guestCount, roomType) => {
    const maxAllowed = roomGuestLimits[roomType] || Infinity;
    if (guestCount > maxAllowed) {
      setError(`❌ ${roomType} room allows only up to ${maxAllowed} guest(s).`);
    } else {
      setError('');
    }
  };

  const handleGuestDetailChange = (index, field, value) => {
    const updatedGuests = [...guestDetails];
    updatedGuests[index][field] = value;
    setGuestDetails(updatedGuests);
  };

  const handleMealQuantityChange = (mealName, value) => {
    setMealQuantities((prev) => ({
      ...prev,
      [mealName]: parseInt(value, 10) || 0,
    }));
  };

  const calculateNights = () => {
    if (!formData.checkin || !formData.checkout) return 0;
    const checkIn = new Date(formData.checkin);
    const checkOut = new Date(formData.checkout);
    const diffTime = checkOut - checkIn;
    const nights = Math.ceil(diffTime / (1000 * 3600 * 24));
    return nights > 0 ? nights : 1;
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    const selectedRoom = rooms.find((room) => room.title === formData.roomCategory);
    const roomRate = selectedRoom ? selectedRoom.price : 0;
    const roomTotal = roomRate * nights;

    const mealsTotal = meals.reduce((total, meal) => {
      return total + (meal.price * (mealQuantities[meal.name] || 0));
    }, 0);

    return roomTotal + mealsTotal;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maxGuests = roomGuestLimits[formData.roomCategory] || Infinity;

    if (formData.guests > maxGuests) {
      setError(`❌ Max ${maxGuests} guests allowed in a ${formData.roomCategory} room.`);
      return;
    }

    const newBooking = {
      ...formData,
      guestDetails,
      meals: mealQuantities,
      totalPrice: calculateTotalPrice(),
      // bookedBy: currentUser?.firstName || currentUser?.email || 'Unknown User',
      bookedBy: currentUser?.email || 'unknown@example.com',
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking),
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/booking-summary', { state: data.booking });
      } else {
        setError(data.message || 'Failed to submit booking');
      }
    } catch (err) {
      console.error('Error submitting booking:', err);
      setError('Booking failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg max-w-2xl mx-auto space-y-6 shadow-lg">
      <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
              >
                ✖
              </button>
            </div>
      <h2 className="text-2xl font-bold text-center text-blue-700">Room Booking</h2>

      {error && <div className="text-red-600 text-center">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <h2>Add number of guest</h2>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          
          onChange={handleChange}
          placeholder="Number of Guests"
          className="border p-2 rounded"
          required
        />
        <h2>Select room</h2>
        <select
          name="roomCategory"
          value={formData.roomCategory}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          {rooms.map((room) => (
            <option key={room._id} value={room.title}>
              {room.title} - ${room.price}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <h2>Checkin Date</h2>
        <input
          type="date"
          name="checkin"
          value={formData.checkin}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <h2>CheckOut Date</h2>
        <input
          type="date"
          name="checkout"
          value={formData.checkout}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <div className="bg-gray-50 p-4 rounded border border-dashed space-y-2">
        <h3 className="font-semibold text-blue-700">Meals</h3>
        {meals.map((meal) => (
          <div key={meal.name} className="flex justify-between items-center">
            <label className="font-medium">{meal.name} (${meal.price})</label>
            <input
              type="number"
              min="0"
              value={mealQuantities[meal.name] || 0}
              onChange={(e) => handleMealQuantityChange(meal.name, e.target.value)}
              className="border p-1 rounded w-24 text-right"
            />
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded border space-y-3">
        <h3 className="text-lg font-bold text-blue-700">Guest Details</h3>
        {guestDetails.map((guest, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={guest.name}
              onChange={(e) => handleGuestDetailChange(i, 'name', e.target.value)}
              placeholder={`Guest ${i + 1} Name`}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="number"
              value={guest.age}
              onChange={(e) => handleGuestDetailChange(i, 'age', e.target.value)}
              placeholder="Age"
              className="border p-2 rounded w-full"
              required
            />
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500">
        Duration: {calculateNights()} night(s)
      </div>
      <div className="text-center text-xl font-bold text-green-700">
        Total: ${calculateTotalPrice()}
      </div>

      <button type="submit" className="bg-blue-600 w-full text-white py-3 rounded hover:bg-blue-700">
        Submit Booking
      </button>
    </form>
  );
}
