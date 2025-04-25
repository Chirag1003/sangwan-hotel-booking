
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0D1B39] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Address + Brand */}
        <div>
          <h2 className="text-lg font-bold mb-2">SANGWAN HOTEL</h2>
          <p>7J522+JFX, Birhi, Birhi Kalan, Haryana 127026</p>
          <p>+91 9813167873</p>
          <p>sangwanhotel@gmail.com</p>
        </div>

        {/* Info Links */}
        <div className="space-y-2 flex flex-col">
          <Link to="/" className="font-semibold hover:text-yellow-500 transition-colors duration-200">About Us</Link>
          <Link to="/contact" className="hover:text-yellow-500 transition-colors duration-200">Contact</Link>
          <Link to="/terms-and-conditions" className="hover:text-yellow-500 transition-colors duration-200">Terms & Conditions</Link>
        </div>

        {/* Social Icons */}
        <div className="space-y-2">
          <div className="flex flex-col gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-500">
              <FaFacebookF /> Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-500">
              <FaTwitter /> Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-yellow-500">
              <FaInstagram /> Instagram
            </a>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div>
          <p className="font-semibold mb-2">Subscribe to our newsletter</p>
          <form
            className="flex border border-yellow-400 rounded-lg overflow-hidden max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              const emailInput = e.target.elements.email.value;
              if (!emailInput) return;
              const subject = encodeURIComponent('Newsletter Subscription Request');
              const body = encodeURIComponent(`Hi, I want to subscribe to your hotel newsletter.\n\nUser Email: ${emailInput}`);
              window.location.href = `mailto:cksangwan2003@gmail.com?subject=${subject}&body=${body}`;
            }}
          >
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="flex-grow px-4 py-2 bg-[#0D1B39] text-white border-none outline-none placeholder-white"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-[#0D1B39] px-4 font-semibold hover:bg-yellow-500 transition"
            >
              OK
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
