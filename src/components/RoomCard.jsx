import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate(`book-room/${room._id}`);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="50"
            viewBox="0 0 512 512"
          >
            <path
              fill="#E04F5F"
              d="M7.9,256C7.9,119,119,7.9,256,7.9C393,7.9,504.1,119,504.1,256c0,137-111.1,248.1-248.1,248.1C119,504.1,7.9,393,7.9,256z"
            ></path>
            <path
              fill="#FFF"
              d="M408.1,206.8l-150.1-74.9c-1.3-0.6-2.7-0.6-4,0l-150.2,74.9c-1.7,0.8-2.7,2.4-2.7,4.3v29.6c0,1.6,0.8,3.1,2.2,4c1.4,0.9,3.1,1,4.5,0.3l148.2-74l148.1,74c0.6,0.3,1.3,0.5,2,0.5c0.9,0,1.8-0.2,2.5-0.7c1.4-0.9,2.2-2.4,2.2-4V211C410.8,209.2,409.8,207.5,408.1,206.8z"
            ></path>
            <path
              fill="#FFF"
              d="M380.5 245.8L256 183.8 131.5 245.8 131.5 360.8 200.5 360.8 200.5 272.6 248 272.6 248 360.8 380.5 360.8z"
            ></path>
            <path fill="#EA4949" d="M263.7 272.6H295.7V304.6H263.7z"></path>
          </svg>
          Room {room.roomNumber}
        </div>
        <p className="text-gray-700 text-base">Type: {room.type}</p>
        <p className="text-gray-700 text-base">
          Capacity: {room.capacity} | Occupied: {room.occupied}
        </p>
        <p className="text-gray-700 text-base">
          Availability:{" "}
          <span
            className={
              room.availabilityStatus === "Available"
                ? "text-green-500"
                : "text-red-500"
            }
          >
            {room.availabilityStatus}
          </span>
        </p>
        <div className="mt-4 flex space-x-2">
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              room.features.AC
                ? "bg-green-200 text-green-800"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            AC: {room.features.AC ? "Yes" : "No"}
          </span>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              room.features.WIFI
                ? "bg-blue-200 text-blue-800"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            WIFI: {room.features.WIFI ? "Yes" : "No"}
          </span>
        </div>
        <button
          onClick={handleBookClick}
          className={`mt-4 px-4 py-2 rounded text-white ${
            room.availabilityStatus === "Occupied"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
          disabled={room.availabilityStatus === "Occupied"}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
