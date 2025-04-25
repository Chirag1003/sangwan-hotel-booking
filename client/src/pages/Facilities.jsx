import React from 'react';
import gymImage from '../assets/Group 44.png'; // Gym image
import spa from '../assets/Group 46.png'; // Spa image
import restaurant from '../assets/Group 49.png'; // Restaurant image
import swimmingpool from '../assets/Group 50.png'; // Swimming Pool image

const facilities = [
  {
    image: gymImage,
    title: 'The Gym',
    description: 'A state-of-the-art gym for your fitness needs.',
  },
  {
    image: swimmingpool,
    title: 'Swimming Pool',
    description: 'Take a dip in our luxurious swimming pool.',
  },
  {
    image: restaurant,
    title: 'Poolside Bar',
    description: 'Enjoy your drinks by the pool.',
  },
  {
    image: spa,
    title: 'The Spa',
    description: 'Relax and rejuvenate with our spa treatments.',
  },
];

export default function Facilities() {
  return (
    <div className="p-6 bg-gray-100 mt-20">

      <h2 className="text-4xl font-semibold text-center ">FACILITIES</h2>
      <div className="mt-6 text-center">
        <p className="text-lg font-medium text-gray-700 mx-48 mb-6">
          We want your stay at Sangwan Hotel to be truly unforgettable. That is why we give special attention to all of your needs so that we can ensure an experience quite unique. Luxury hotels offer the perfect setting with stunning views for leisure, and our modern luxury resort facilities will help you enjoy the best of all.
        </p>
      </div>
      <div className="space-y-6">
        {facilities.map((facility, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative">
              <img src={facility.image} alt={facility.title} className="w-full h-[30rem] object-cover" />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent text-white text-center py-2">
                <div className="bg-black bg-opacity-70 px-8 py-2 inline-block rounded-md">
                  <h3 className="text-xl font-semibold">{facility.title}</h3>
                </div>
                </div>
            </div>
            <div className="p-4">
              <p className="text-gray-500 text-center">{facility.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
