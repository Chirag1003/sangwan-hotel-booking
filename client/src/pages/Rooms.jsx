
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const rooms = [
  {
    type: 'Single',
    price: 100,
    description: 'Perfect for solo travelers. Cozy, quiet, and private.',
    image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    type: 'Double',
    price: 150,
    description: 'Spacious and perfect for couples with modern amenities.',
    image: 'https://images.pexels.com/photos/31739393/pexels-photo-31739393/free-photo-of-modern-cozy-bedroom-with-elegant-decor.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    type: 'Triple',
    price: 200,
    description: 'Great for families or groups. Comfort and space combined.',
    image: 'https://images.pexels.com/photos/31737839/pexels-photo-31737839/free-photo-of-elegant-modern-living-room-interior-design.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

export default function Rooms() {
  return (
    <div className="p-6 bg-gray-100 mt-20">
      <h2
        className="text-4xl font-semibold text-center "
        
      >
        Choose Your Room
      </h2>
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-gray-700 mx-48 mb-6">
          All rooms come with complimentary breakfast and Wifi
        </p>
      </div>

      <div className="space-y-6">
        {rooms.map((room, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <img src={room.image} alt={room.type} className="w-full h-[30rem] object-cover" />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white text-center py-2">
                <div className="bg-black bg-opacity-70 px-4 py-2 inline-block rounded-md">
                  <h3 className="text-xl font-semibold">{room.type} Room</h3>
                  <p className="font-bold text-lg text-green-600">${room.price}/night</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-500 text-center">{room.description}</p>
              <div className="text-center mt-4">
                <Link
                  to="/booking"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
