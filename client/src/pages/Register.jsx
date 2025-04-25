import { useState } from 'react';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirm: '',
    gender: '', age: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm) {
      return alert("⚠️ Passwords do not match");
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          age: formData.age,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert('✅ Registered successfully');
        window.location.href = '/login';
      }
      else alert(`❌ ${data.message}`);
    } catch (err) {
      console.error(err);
      alert('❌ Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24">
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 pt-12 rounded-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Create Account</h2>

        <input name="firstName" type="text" placeholder="First Name" required onChange={handleChange}
          className="w-full border px-4 py-2 rounded" />

        <input name="lastName" type="text" placeholder="Last Name" required onChange={handleChange}
          className="w-full border px-4 py-2 rounded" />

        <input name="email" type="email" placeholder="Email" required onChange={handleChange}
          className="w-full border px-4 py-2 rounded" />

        <input name="password" type="password" placeholder="Password" required onChange={handleChange}
          className="w-full border px-4 py-2 rounded" />

        <input name="confirm" type="password" placeholder="Confirm Password" required onChange={handleChange}
          className="w-full border px-4 py-2 rounded" />

        <select name="gender" required onChange={handleChange}
          className="w-full border px-4 py-2 rounded">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input name="age" type="number" placeholder="Age" required onChange={handleChange}
          className="w-full border px-4 py-2 rounded" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    </div>
  );
}
