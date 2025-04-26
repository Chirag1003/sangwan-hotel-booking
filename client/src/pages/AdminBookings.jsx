
import { useEffect, useState } from 'react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [rooms, setRooms] = useState([]);
  const [filterText, setFilterText] = useState('');


  const [newBooking, setNewBooking] = useState({
    bookedBy: '',
    roomCategory: '',
    guests: 1,
    checkin: '',
    checkout: '',
    totalPrice: 0,
    guestDetails: [{ name: '', age: '' }],
  });

  useEffect(() => {
    fetchBookings();
    fetch('http://localhost:5000/api/rooms')
      .then((res) => res.json())
      .then(setRooms);
  }, []);

  const fetchBookings = async () => {
    const res = await fetch('http://localhost:5000/api/bookings');
    const data = await res.json();
    setBookings(data);
  };

  const deleteBooking = async (id) => {
    if (window.confirm('Delete this booking?')) {
      await fetch(`http://localhost:5000/api/bookings/${id}`, { method: 'DELETE' });
      fetchBookings();
    }
  };

  const startEdit = (booking) => {
    setEditingId(booking._id);
    setEditData({ ...booking });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  const handleEditGuestChange = (i, field, value) => {
    const updated = [...editData.guestDetails];
    updated[i][field] = value;
    setEditData({ ...editData, guestDetails: updated });
  };

  const addGuestInEdit = () => {
    setEditData({
      ...editData,
      guestDetails: [...editData.guestDetails, { name: '', age: '' }],
    });
  };


  const saveEdit = async (id) => {
    // Guest Limit Check
    const roomType = editData.roomCategory.toLowerCase();
    const guestCount = editData.guestDetails.length;
  
    if (
      (roomType === 'single' && guestCount > 2) ||
      (roomType === 'double' && guestCount > 4)
    ) {
      alert(`❌ ${roomType.charAt(0).toUpperCase() + roomType.slice(1)} room guest limit exceeded!`);
      return;
    }
  
    // Find selected room
    const selectedRoom = rooms.find((r) => r.title === editData.roomCategory);
    if (!selectedRoom) {
      alert('Invalid room selected.');
      return;
    }
  
    // Calculate new total price
    const nights = (new Date(editData.checkout) - new Date(editData.checkin)) / (1000 * 3600 * 24);
    const validNights = nights > 0 ? nights : 1;
    const newTotalPrice = selectedRoom.price * validNights;
  
    // Prepare updated booking data
    const updatedBooking = {
      ...editData,
      guests: guestCount,
      totalPrice: newTotalPrice,
    };
  
    // Save updated booking
    await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBooking),
    });
  
    setEditingId(null);
    fetchBookings();
  };
  
  

  const handleNewBookingChange = (e) => {
    const { name, value } = e.target;
    setNewBooking({ ...newBooking, [name]: value });
  };

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...newBooking.guestDetails];
    updatedGuests[index][field] = value;
    setNewBooking({ ...newBooking, guestDetails: updatedGuests });
  };

  const addGuestField = () => {
    setNewBooking({
      ...newBooking,
      guestDetails: [...newBooking.guestDetails, { name: '', age: '' }],
    });
  };

  const calculateTotalPrice = () => {
    const selectedRoom = rooms.find((r) => r.title === newBooking.roomCategory);
    if (!selectedRoom) return 0;

    const nights = (new Date(newBooking.checkout) - new Date(newBooking.checkin)) / (1000 * 3600 * 24);
    const validNights = nights > 0 ? nights : 1;
    return selectedRoom.price * validNights;
  };

  const submitNewBooking = async (e) => {
    e.preventDefault();
    const total = calculateTotalPrice();

    const bookingData = {
      ...newBooking,
      totalPrice: total,
    };

    await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });

    setNewBooking({
      bookedBy: '',
      roomCategory: '',
      guests: 1,
      checkin: '',
      checkout: '',
      totalPrice: 0,
      guestDetails: [{ name: '', age: '' }],
    });

    fetchBookings();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
      <input
  type="text"
  placeholder="Search by guest name or room type..."
  value={filterText}
  onChange={(e) => setFilterText(e.target.value)}
  className="mb-6 p-2 border rounded w-full max-w-md"
/>
      {/* Bookings Table */}
    
            <table className="w-full bg-white shadow rounded-lg mb-10">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4">Booked By</th>
            <th className="py-3 px-4">Room</th>
            <th className="py-3 px-4">Guests</th>
            <th className="py-3 px-4">Dates</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4">Guest Details</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.filter(
    (b) =>
      b.bookedBy?.toLowerCase().includes(filterText.toLowerCase()) ||
      b.roomCategory?.toLowerCase().includes(filterText.toLowerCase())
  ).map((booking) =>
            editingId === booking._id ? (
              <tr key={booking._id} className="border-b bg-yellow-50">
                <td className="py-3 px-4">
                  <input
                    value={editData.bookedBy}
                    name="bookedBy"
                    onChange={handleEditChange}
                    className="border p-1 rounded w-full"
                  />
                </td>
                <td className="py-3 px-4">
                  <select
                    name="roomCategory"
                    value={editData.roomCategory}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-full"
                  >
                    {rooms.map((room) => (
                      <option key={room._id} value={room.title}>
                        {room.title} — ₹{room.price}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4">
                  {editData.guestDetails.length} guests
                  <button
                    type="button"
                    onClick={addGuestInEdit}
                    className="ml-2 text-blue-600 underline"
                  >
                    + Add Guest
                  </button>
                </td>
                <td className="py-3 px-4">
                  <input
                    type="date"
                    name="checkin"
                    value={editData.checkin.slice(0, 10)}
                    onChange={handleEditChange}
                    className="border p-1 mb-1 rounded w-full"
                  />
                  <input
                    type="date"
                    name="checkout"
                    value={editData.checkout.slice(0, 10)}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-full"
                  />
                </td>
                <td className="py-3 px-4 font-bold text-green-700">₹{editData.totalPrice}</td>
                <td className="py-3 px-4">
                  {editData.guestDetails.map((g, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={g.name}
                        placeholder="Name"
                        onChange={(e) => handleEditGuestChange(i, 'name', e.target.value)}
                        className="border p-1 rounded w-1/2"
                      />
                      <input
                        type="number"
                        value={g.age}
                        placeholder="Age"
                        onChange={(e) => handleEditGuestChange(i, 'age', e.target.value)}
                        className="border p-1 rounded w-1/2"
                      />
                    </div>
                  ))}
                </td>
                <td className="py-3 px-4 space-y-2">
                  <button
                    onClick={() => saveEdit(booking._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 w-full"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-600 w-full"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={booking._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{booking.bookedBy}</td>
                <td className="py-3 px-4">{booking.roomCategory}</td>
                <td className="py-3 px-4">{booking.guests}</td>
                <td className="py-3 px-4">
                  {new Date(booking.checkin).toLocaleDateString()} →{' '}
                  {new Date(booking.checkout).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 font-bold text-green-700">₹{booking.totalPrice}</td>
                <td className="py-3 px-4">
                  <ul className="list-disc ml-4">
                    {booking.guestDetails.map((g, i) => (
                      <li key={i}>{g.name} (Age: {g.age})</li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => startEdit(booking)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBooking(booking._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {/* Add New Booking Form */}
      <form onSubmit={submitNewBooking} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Booking</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="bookedBy"
            placeholder="Booked By"
            value={newBooking.bookedBy}
            onChange={handleNewBookingChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="roomCategory"
            value={newBooking.roomCategory}
            onChange={handleNewBookingChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Room</option>
            {rooms.map((room) => (
              <option key={room._id} value={room.title}>
                {room.title} — ₹{room.price}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="guests"
            placeholder="Number of Guests"
            value={newBooking.guests}
            onChange={handleNewBookingChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="checkin"
            value={newBooking.checkin}
            onChange={handleNewBookingChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            name="checkout"
            value={newBooking.checkout}
            onChange={handleNewBookingChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <h3 className="text-lg mt-4 font-semibold">Guest Details</h3>
        {newBooking.guestDetails.map((g, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              placeholder="Name"
              value={g.name}
              onChange={(e) => handleGuestChange(i, 'name', e.target.value)}
              className="border p-2 rounded w-1/2"
              required
            />
            <input
              placeholder="Age"
              type="number"
              value={g.age}
              onChange={(e) => handleGuestChange(i, 'age', e.target.value)}
              className="border p-2 rounded w-1/2"
              required
            />
          </div>
        ))}

        <button type="button" onClick={addGuestField} className="text-blue-600 underline mt-2">
          + Add More Guest
        </button>

        <div>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Submit Booking
          </button>
        </div>
      </form>
    </div>
  );
}
