
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import ProfilePage from './pages/ProfilePage';
// import Rooms from './pages/Rooms';
// import Booking from './pages/Booking';
// import BookingSummary from './pages/BookingSummary';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import bgImage from './assets/abc.png';
// import Profile from './pages/Profile';
// import AdminLoginPage from './pages/AdminLoginPage';
// import Facilities from './pages/Facilities';
// import TermsAndConditions from './pages/TermsAndConditions';

// // Admin Pages
// import AdminLayout from './pages/AdminLayout';
// import AdminDashboard from './pages/AdminDashboard';
// import AdminUsers from './pages/AdminUsers';
// import AdminRooms from './pages/AdminRooms';
// import AdminMeals from './pages/AdminMeals';
// import AdminBookings from './pages/AdminBookings';

// function AppContent() {
//   const location = useLocation();
//   const hideFooter = location.pathname.startsWith('/admin');

//   return (
//     <div
//       className="min-h-screen flex flex-col font-sans"
//       style={{
//         backgroundImage: `url('https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&cs=tinysrgb&w=600')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//       }}
//     >
//       <Navbar />
//       <main className="flex-grow">
//         <Routes>
//           {/* Public Pages */}
//           <Route path="/" element={<Home />} />
//           <Route path="/rooms" element={<Rooms />} />
//           <Route path="/booking" element={<Booking />} />
//           <Route path="/booking-summary" element={<BookingSummary />} />
//           <Route path="/admin-login" element={<AdminLoginPage />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/facilities" element={<Facilities />} />
//           <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

//           {/* Admin Panel Pages */}
//           <Route path="/admin" element={<AdminLayout />}>
//             <Route index element={<AdminDashboard />} />
//             <Route path="dashboard" element={<AdminDashboard />} />
//             <Route path="users" element={<AdminUsers />} />
//             <Route path="rooms" element={<AdminRooms />} />
//             <Route path="meals" element={<AdminMeals />} />
//             <Route path="bookings" element={<AdminBookings />} />
//           </Route>
//         </Routes>
//       </main>
//       {!hideFooter && <Footer />}
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AdminProtectedRoute from './components/AdminProtectedRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage'; 
import Rooms from './pages/Rooms';
import Booking from './pages/Booking';
import BookingSummary from './pages/BookingSummary';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminLoginPage from './pages/AdminLoginPage';
import Facilities from './pages/Facilities';
import TermsAndConditions from './pages/TermsAndConditions';

import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminRooms from './pages/AdminRooms';
import AdminMeals from './pages/AdminMeals';
import AdminBookings from './pages/AdminBookings';

function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/admin');

  return (
  
       <div
      className="min-h-screen flex flex-col font-sans"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&cs=tinysrgb&w=600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

          {/* Admin Login */}
          <Route path="/admin-login" element={<AdminLoginPage />} />

          {/* Admin Routes Protected */}
          <Route path="/admin" element={<AdminProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="rooms" element={<AdminRooms />} />
              <Route path="meals" element={<AdminMeals />} />
              <Route path="bookings" element={<AdminBookings />} />
            </Route>
          </Route>
        </Routes>
      </main>

      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
