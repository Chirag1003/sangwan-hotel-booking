
// import { useEffect, useState } from 'react';

// export default function AdminUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState('');
//   const [form, setForm] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     gender: '',
//     age: '',
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/users');
//         const data = await res.json();
//         console.log('Fetched users:', data);
//         setUsers(data);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this user?')) return;
//     try {
//       await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
//       setUsers((prev) => prev.filter((u) => u._id !== id));
//     } catch (err) {
//       console.error('Error deleting user:', err);
//     }
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:5000/api/users/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form),
//       });
//       const newUser = await res.json();
//       if (res.status === 201) {
//         alert('✅ User added');
//         setUsers([...users, newUser.user]);
//         setForm({
//           firstName: '',
//           lastName: '',
//           email: '',
//           password: '',
//           gender: '',
//           age: '',
//         });
//       } else {
//         alert(newUser.message || 'Something went wrong');
//       }
//     } catch (err) {
//       console.error('Error creating user:', err);
//     }
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
//       user.email.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div className=" p-6">
//       <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

//       {/* 🔍 Filter Bar */}
//       <input
//         type="text"
//         placeholder="Search by name or email"
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//         className="mb-4 p-2 w-full max-w-md border rounded"
//       />

//       {/* ➕ Add New User Form */}
//       <form onSubmit={handleCreate} className="bg-white p-4 rounded shadow mb-6">
//         <h2 className="text-lg font-semibold mb-3">Add New User</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <input
//             type="text"
//             placeholder="First Name"
//             value={form.firstName}
//             onChange={(e) => setForm({ ...form, firstName: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={form.lastName}
//             onChange={(e) => setForm({ ...form, lastName: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//             className="border p-2 rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Gender"
//             value={form.gender}
//             onChange={(e) => setForm({ ...form, gender: e.target.value })}
//             className="border p-2 rounded"
//           />
//           <input
//             type="number"
//             placeholder="Age"
//             value={form.age}
//             onChange={(e) => setForm({ ...form, age: e.target.value })}
//             className="border p-2 rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//         >
//           Add User
//         </button>
//       </form>

//       {/* 🧾 User Table */}
//       {loading ? (
//         <p className="text-gray-500">Loading users...</p>
//       ) : (
//         <table className="w-full bg-white shadow rounded-lg">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="py-3 px-4 text-left">Name</th>
//               <th className="py-3 px-4 text-left">Email</th>
//               <th className="py-3 px-4 text-left">Gender</th>
//               <th className="py-3 px-4 text-left">Age</th>
//               <th className="py-3 px-4 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <tr key={user._id} className="border-b hover:bg-gray-50">
//                   <td className="py-3 px-4">
//                     {user.firstName} {user.lastName}
//                   </td>
//                   <td className="py-3 px-4">{user.email}</td>
//                   <td className="py-3 px-4">{user.gender || '—'}</td>
//                   <td className="py-3 px-4">{user.age || '—'}</td>
//                   <td className="py-3 px-4">
//                     <button
//                       onClick={() => handleDelete(user._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="py-6 text-center text-gray-500">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from 'react';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    age: '',
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editingForm, setEditingForm] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();
        console.log('Fetched users:', data);
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const newUser = await res.json();
      if (res.status === 201) {
        alert('✅ User added');
        setUsers([...users, newUser.user]);
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          gender: '',
          age: '',
        });
      } else {
        alert(newUser.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditingForm({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender || '',
      age: user.age || '',
    });
  };

  const handleSaveEdit = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingForm),
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ User updated');
        const updatedUsers = users.map((u) =>
          u._id === userId ? { ...u, ...editingForm } : u
        );
        setUsers(updatedUsers);
        setEditingUserId(null);
        const currentUser = JSON.parse(localStorage.getItem('user'));
      if (currentUser && currentUser._id === userId) {
        localStorage.setItem('user', JSON.stringify({ ...currentUser, ...editingForm }));
      }
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>

      {/* 🔍 Filter Bar */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 w-full max-w-md border rounded"
      />

      {/* ➕ Add New User Form */}
      <form onSubmit={handleCreate} className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Add New User</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Gender"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add User
        </button>
      </form>

      {/* 🧾 User Table */}
      {loading ? (
        <p className="text-gray-500">Loading users...</p>
      ) : (
        <table className="w-full bg-white shadow rounded-lg">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Gender</th>
              <th className="py-3 px-4 text-left">Age</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editingForm.firstName}
                        onChange={(e) =>
                          setEditingForm({ ...editingForm, firstName: e.target.value })
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      `${user.firstName} ${user.lastName}`
                    )}
                  </td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    {editingUserId === user._id ? (
                      <input
                        type="text"
                        value={editingForm.gender}
                        onChange={(e) =>
                          setEditingForm({ ...editingForm, gender: e.target.value })
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      user.gender || '—'
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {editingUserId === user._id ? (
                      <input
                        type="number"
                        value={editingForm.age}
                        onChange={(e) =>
                          setEditingForm({ ...editingForm, age: e.target.value })
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      user.age || '—'
                    )}
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    {editingUserId === user._id ? (
                      <button
                        onClick={() => handleSaveEdit(user._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
