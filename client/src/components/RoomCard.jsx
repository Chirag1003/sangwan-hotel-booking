export default function RoomCard({ title, description, price, image }) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm mx-auto">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-gray-600 mt-1">{description}</p>
          <div className="mt-3 flex justify-between items-center">
            <span className="text-blue-600 font-bold text-lg">${price}/night</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  }
  