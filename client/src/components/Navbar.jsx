
// import { Link, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState('');

//   // Check login state from localStorage
//   useEffect(() => {
//     const loginStatus = localStorage.getItem('isLoggedIn');
//     const user = localStorage.getItem('user');
//     setIsLoggedIn(loginStatus === 'true');

//     if (user) {
//       const parsedUser = JSON.parse(user);
//       setUserName(parsedUser.firstName || parsedUser.email);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isLoggedIn');
//     localStorage.removeItem('user');
//     alert('👋 You have been logged out.');
//     navigate('/'); // Redirect to home
//     setIsLoggedIn(false);
//   };

//   return (
//     <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-10 pb-6 z-50">
//       {/* Logo */}
//       <div className="bg-yellow-400 text-black px-6 py-4 rounded-b-xl shadow-md flex flex-col justify-center items-center leading-tight">
//         <span className="text-xl font-bold tracking-wide">SANGWAN</span>
//         <span className="text-sm font-semibold tracking-widest">HOTEL</span>
//       </div>

//       {/* Navigation Links */}
//       <div className="flex space-x-8 text-white text-lg font-medium items-center">
//         <Link to="/" className="hover:underline underline-offset-4">Home</Link>
//         <Link to="/facilities" className="hover:underline underline-offset-4">Facilities</Link>
//         <Link to="/rooms" className="hover:underline underline-offset-4">Rooms</Link>
//         <Link to="/contact" className="hover:underline underline-offset-4">Contact-us</Link>

//         {isLoggedIn ? (
//           <>
//             {/* Show Profile Link */}
//             <span className="text-yellow-300 font-semibold">Hi, {userName.split(' ')[0]}</span>
//             <Link
//               to="/profile"
//               className="hover:underline underline-offset-4 text-yellow-300"
//             >
//               Profile
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="hover:underline underline-offset-4 text-red-300"
//             >
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="hover:underline underline-offset-4">Login</Link>
//             <Link to="/register" className="hover:underline underline-offset-4">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const isAdminPage = location.pathname.startsWith('/admin');

  // Check login state from localStorage
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    const user = localStorage.getItem('user');
    setIsLoggedIn(loginStatus === 'true');

    if (user) {
      const parsedUser = JSON.parse(user);
      setUserName(parsedUser.firstName || parsedUser.email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    alert('👋 You have been logged out.');
    navigate('/'); // Redirect to home
    setIsLoggedIn(false);
  };

  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-10 pb-6 z-50">
      {/* Logo */}
      <div className="bg-yellow-400 text-black px-6 py-4 rounded-b-xl shadow-md flex flex-col justify-center items-center leading-tight">
        <span className="text-xl font-bold tracking-wide">SANGWAN</span>
        <span className="text-sm font-semibold tracking-widest">HOTEL</span>
      </div>

      {/* Navigation Links */}
      {!isAdminPage && (
        <div className="flex space-x-8 text-white text-lg font-medium items-center">
          <Link to="/" className="hover:underline underline-offset-4">Home</Link>
          <Link to="/facilities" className="hover:underline underline-offset-4">Facilities</Link>
          <Link to="/rooms" className="hover:underline underline-offset-4">Rooms</Link>
          <Link to="/contact" className="hover:underline underline-offset-4">Contact-us</Link>

          {isLoggedIn ? (
            <>
              {/* Show Profile Link */}
              <span className="text-yellow-300 font-semibold">Hi, {userName.split(' ')[0]}</span>
              <Link
                to="/profile"
                className="hover:underline underline-offset-4 text-yellow-300"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="hover:underline underline-offset-4 text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline underline-offset-4">Login</Link>
              <Link to="/register" className="hover:underline underline-offset-4">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
