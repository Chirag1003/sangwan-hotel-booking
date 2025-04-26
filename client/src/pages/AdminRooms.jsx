// import { useEffect, useState } from 'react';

// export default function AdminRooms() {
//   const [rooms, setRooms] = useState([]);
//   const [form, setForm] = useState({ title: '', price: '', image: '' });

//   const fetchRooms = async () => {
//     const res = await fetch('/api/rooms');
//     const data = await res.json();
//     setRooms(data);
//   };

//   useEffect(() => {
//     fetchRooms();
//   }, []);

//   const handleAddRoom = async (e) => {
//     e.preventDefault();
//     await fetch('/api/rooms', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });
//     setForm({ title: '', price: '', image: '' });
//     fetchRooms();
//   };

//   const handleDelete = async (id) => {
//     await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
//     fetchRooms();
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Manage Rooms</h1>

//       <form onSubmit={handleAddRoom} className="bg-white p-4 rounded shadow-md mb-6">
//         <h2 className="text-lg font-semibold mb-2">Add New Room</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input
//             type="text"
//             placeholder="Room Type"
//             value={form.title}
//             onChange={(e) => setForm({ ...form, title: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Price"
//             value={form.price}
//             onChange={(e) => setForm({ ...form, price: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Image URL"
//             value={form.image}
//             onChange={(e) => setForm({ ...form, image: e.target.value })}
//             className="border p-2 rounded"
//           />
//         </div>
//         <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
//           Add Room
//         </button>
//       </form>

//       <table className="w-full bg-white shadow rounded-lg">
//         <thead className="bg-blue-600 text-white">
//           <tr>
//             <th className="py-3 px-4 text-left">Room</th>
//             <th className="py-3 px-4 text-left">Price</th>
//             <th className="py-3 px-4 text-left">Image</th>
//             <th className="py-3 px-4 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room) => (
//             <tr key={room._id} className="border-b hover:bg-gray-50">
//               <td className="py-3 px-4">{room.title}</td>
//               <td className="py-3 px-4">${room.price}</td>
//               <td className="py-3 px-4 text-sm text-blue-600">{room.image || '—'}</td>
//               <td className="py-3 px-4">
//                 <button
//                   onClick={() => handleDelete(room._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ title: '', price: '', image: '' });
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editingForm, setEditingForm] = useState({ title: '', price: '', image: '' });

  const fetchRooms = async () => {
    const res = await fetch('/api/rooms');
    const data = await res.json();
    setRooms(data);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', price: '', image: '' });
    fetchRooms();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this room?')) return;
    await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
    fetchRooms();
  };

  const handleEditClick = (room) => {
    setEditingRoomId(room._id);
    setEditingForm({ title: room.title, price: room.price, image: room.image });
  };

  const handleSaveEdit = async (roomId) => {
    try {
      const res = await fetch(`/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingForm),
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Room updated!');
        fetchRooms();
        setEditingRoomId(null);
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Rooms</h1>

      {/* ➕ Add New Room Form */}
      <form onSubmit={handleAddRoom} className="bg-white p-4 rounded shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Add New Room</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Room Type"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add Room
        </button>
      </form>

      {/* 🏨 Rooms Table */}
      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Room</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Image</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4">
                {editingRoomId === room._id ? (
                  <input
                    type="text"
                    value={editingForm.title}
                    onChange={(e) => setEditingForm({ ...editingForm, title: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  room.title
                )}
              </td>
              <td className="py-3 px-4">
                {editingRoomId === room._id ? (
                  <input
                    type="number"
                    value={editingForm.price}
                    onChange={(e) => setEditingForm({ ...editingForm, price: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  `$${room.price}`
                )}
              </td>
              <td className="py-3 px-4">
                {editingRoomId === room._id ? (
                  <input
                    type="text"
                    value={editingForm.image}
                    onChange={(e) => setEditingForm({ ...editingForm, image: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  room.image || '—'
                )}
              </td>
              <td className="py-3 px-4 space-x-2">
                {editingRoomId === room._id ? (
                  <button
                    onClick={() => handleSaveEdit(room._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(room)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(room._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
