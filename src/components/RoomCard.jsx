import React from "react";
import { useNavigate } from "react-router-dom";
import roomimage2 from "../assets/room_image 2.jpg";
const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`book-room/${room._id}`);
  };

  return (
    <div className="w-[300px] bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={roomimage2} alt="image" />
      <div className="p-4">
        {/* Room status and number */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Room {room.roomNumber}</h2>
          <span className={`px-2 py-1 text-xs rounded-full ${
            room.availabilityStatus === "Available" 
              ? "bg-green-100 text-green-600" 
              : "bg-red-100 text-red-600"
          }`}>
            {room.availabilityStatus}
          </span>
        </div>

        {/* Room details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{room.type}</span>
            <span>{room.occupied} / {room.capacity}</span>
          </div>

          {/* Features */}
          <div className="flex gap-2 justify-between">
            <span>
            <span className={`px-2 py-1 rounded text-xs ${
              room.features.AC ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-600"
            }`}>
              {room.features.AC ? "AC" : "No AC"}
            </span>
            <span className={`px-2 py-1 rounded text-xs ${
              room.features.WIFI ? "bg-blue-50 text-blue-700" : "bg-gray-50 text-gray-600"
            }`}>
              {room.features.WIFI ? "WiFi" : "No WiFi"}
            </span>
            </span>
            {/* Room fees  */}
          <div className="text-right text-lg text-orange-500">${room.roomfees}</div>
          </div>
          
        </div>

        {/* Book button */}
        <button
          onClick={handleBookClick}
          disabled={room.availabilityStatus === "Occupied"}
          className={`w-full mt-3 py-2 rounded text-sm font-medium transition-all duration-300 ${
            room.availabilityStatus === "Occupied"
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {room.availabilityStatus === "Occupied" ? "Occupied" : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;