import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  HomeIcon,
  CalendarIcon,
  CreditCardIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function RoomDetails() {
  const [roomDetails, setRoomDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [rendered, setRendered] = useState(false);

  // API URL
  const api = import.meta.env.VITE_API_URL;

  // LocalStorage
  const residentId =
    typeof window !== "undefined" ? localStorage.getItem("userid") : null;

  useEffect(() => {
    const fetchResidentRoomDetails = async () => {
      try {
        const response = await axios.get(`${api}/resident/room/${residentId}`);
        console.log(response.data);
        setRoomDetails(response.data.roomDetails);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
        setTimeout(() => setRendered(true), 100); // Delay to ensure DOM is ready
      }
    };

    if (residentId) {
      fetchResidentRoomDetails();
    } else {
      setLoading(false);
      setTimeout(() => setRendered(true), 100); // Delay to ensure DOM is ready
    }
  }, [api, residentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="h-12 w-64 mb-8 bg-gray-200 animate-pulse rounded"></div>
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-48 w-full bg-gray-200 animate-pulse rounded"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8 transition-opacity duration-500 ${
        rendered ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Your Room Details
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
              rendered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="bg-green-100 p-4">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <HomeIcon className="w-6 h-6 mr-2" />
                Room Information
              </h2>
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800">
                Room {roomDetails.roomNumber}
              </p>
              <span className="inline-block mt-2 px-2 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                {roomDetails.roomStatus}
              </span>
              <p className="mt-2 text-gray-600">
                Occupancy: {roomDetails.roomOccupancy}
              </p>
            </div>
          </div>

          <div
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
              rendered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="bg-blue-100 p-4">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <CalendarIcon className="w-6 h-6 mr-2" />
                Stay Duration
              </h2>
            </div>
            <div className="p-4">
              <p className="text-gray-600">
                Check In:{" "}
                <span className="font-semibold text-gray-800">
                  {new Date(roomDetails.checkInDate).toLocaleDateString()}
                </span>
              </p>
              <p className="mt-2 text-gray-600">
                Check Out:{" "}
                <span className="font-semibold text-gray-800">
                  {new Date(roomDetails.checkOutDate).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>

          <div
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
              rendered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="bg-green-100 p-4">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <CreditCardIcon className="w-6 h-6 mr-2" />
                Fees
              </h2>
            </div>
            <div className="p-4">
              <p className="text-2xl font-bold text-green-600">
                ${roomDetails.roomFees}
              </p>
              <p className="mt-1 text-gray-600">per month</p>
            </div>
          </div>

          <div
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
              rendered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="bg-blue-100 p-4">
              <h2 className="flex items-center text-xl font-semibold text-gray-800">
                <UsersIcon className="w-6 h-6 mr-2" />
                Amenities
              </h2>
            </div>
            <div className="p-4">
              <ul className="list-disc list-inside text-gray-600">
                <li>Free Wi-Fi</li>
                <li>Air Conditioning</li>
                <li>Daily Housekeeping</li>
                <li>24/7 Security</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;
