import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        // alert(`✅ Welcome back, ${data.user.email}`);
        if (res.ok) {
          // Save user info in localStorage
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(data.user));
        
          alert(`✅ Welcome, ${data.user.firstName || data.user.email}`);
          window.location.href = '/'; // redirect to home
        }
        
        // Optional: Redirect to dashboard or home
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          required
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          required
          placeholder="Password"
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        <p className="text-sm text-center mt-2 text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 underline font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
