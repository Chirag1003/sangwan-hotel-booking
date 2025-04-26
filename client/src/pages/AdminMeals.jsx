import { useEffect, useState } from 'react';

export default function AdminMeals() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [newMeal, setNewMeal] = useState({ name: '', price: '' });
  const [editingMealId, setEditingMealId] = useState(null);
  const [editingPrice, setEditingPrice] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/meals')
      .then((res) => res.json())
      .then((data) => setMeals(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error('Error fetching meals:', err);
        setMeals([]);
      });
  }, []);

  const handleAddMeal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/meals/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMeal),
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Meal added successfully!');
        setMeals([...meals, data.meal]);
        setNewMeal({ name: '', price: '' });
      } else {
        alert(data.message || 'Add failed');
      }
    } catch (err) {
      console.error('Add meal failed:', err);
    }
  };

  const handleEditClick = (meal) => {
    setEditingMealId(meal._id);
    setEditingPrice(meal.price);
  };

  // const handleSaveEdit = async (meal) => {
  //   try {
  //     const res = await fetch('http://localhost:5000/api/meals/update', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ name: meal.name, price: editingPrice }),
  //     });
  //     const data = await res.json();
  //     if (res.ok) {
  //       alert('✅ Meal updated!');
  //       const updatedMeals = meals.map((m) =>
  //         m._id === meal._id ? { ...m, price: editingPrice } : m
  //       );
  //       setMeals(updatedMeals);
  //       setEditingMealId(null);
  //     } else {
  //       alert(data.message || 'Update failed');
  //     }
  //   } catch (err) {
  //     console.error('Update error:', err);
  //   }
  // };
  const handleSaveEdit = async (meal) => {
    try {
      const res = await fetch('http://localhost:5000/api/meals/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: meal.name, price: editingPrice }), // ✅ sending meal name
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Meal updated!');
        const updatedMeals = meals.map((m) =>
          m._id === meal._id ? { ...m, price: editingPrice } : m
        );
        setMeals(updatedMeals);
        setEditingMealId(null);
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this meal?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/meals/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok) {
        alert('✅ Meal deleted');
        setMeals(meals.filter((meal) => meal._id !== id));
      } else {
        alert(data.message || 'Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Meals</h1>

      {/* 🔍 Filter */}
      <input
        type="text"
        placeholder="Search meal types..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 w-full max-w-md border rounded"
      />

      {/* 🧾 Meals Table */}
      <table className="w-full bg-white shadow rounded mb-6">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Meal</th>
            <th className="py-3 px-4 text-left">Price</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMeals.length > 0 ? (
            filteredMeals.map((meal) => (
              <tr key={meal._id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 capitalize">{meal.name}</td>
                <td className="py-3 px-4">
                  {editingMealId === meal._id ? (
                    <input
                      type="number"
                      value={editingPrice}
                      onChange={(e) => setEditingPrice(e.target.value)}
                      className="border p-1 rounded w-24"
                    />
                  ) : (
                    `$${meal.price}`
                  )}
                </td>
                <td className="py-3 px-4 space-x-2">
                  {editingMealId === meal._id ? (
                    <button
                      onClick={() => handleSaveEdit(meal)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(meal)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-gray-500 py-6">
                No meals found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ➕ Add Meal */}
      <form
        onSubmit={handleAddMeal}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        <h2 className="text-lg font-semibold">Add New Meal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Meal name"
            value={newMeal.name}
            onChange={(e) =>
              setNewMeal({ ...newMeal, name: e.target.value.toLowerCase() })
            }
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newMeal.price}
            onChange={(e) =>
              setNewMeal({ ...newMeal, price: +e.target.value })
            }
            className="border p-2 rounded"
            required
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Meal
        </button>
      </form>
    </div>
  );
}
