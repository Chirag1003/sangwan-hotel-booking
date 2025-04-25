// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Rooms from './pages/Rooms';
// import Contact from './pages/Contact';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Navbar from './components/Navbar';
// import Booking from './pages/Booking';
// import BookingSummary from './pages/BookingSummary';
// import AdminPanel from './pages/AdminPanel';
// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//       <Route path="/booking" element={<Booking />} />
//         <Route path="/" element={<Home />} />
//         <Route path="/rooms" element={<Rooms />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/summary" element={<BookingSummary />} />
//         <Route path="/admin" element={<AdminPanel/>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home'; // ✅ correct
import ProfilePage from './pages/ProfilePage'; 
import Rooms from './pages/Rooms';
import Booking from './pages/Booking';
import BookingSummary from './pages/BookingSummary';
import AdminPanel from './pages/AdminPanel';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import bgImage from './assets/abc.png';
import Profile from './pages/Profile';
import AdminLoginPage from './pages/AdminLoginPage';
import Facilities from './pages/Facilities';
import TermsAndConditions from './pages/TermsAndConditions';

export default function App() {
  return (
    <Router>
       <div
        className="min-h-screen flex flex-col font-sans"
        style={{
          // backgroundImage: `url(${bgImage})`,
          backgroundImage: `url('https://images.pexels.com/photos/2901215/pexels-photo-2901215.jpeg?auto=compress&cs=tinysrgb&w=600')`,

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
      
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-summary" element={<BookingSummary />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/facilities" element={<Facilities />} /> 
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
