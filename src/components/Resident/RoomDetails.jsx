import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
// import room_image1 from "../../assets/room_image1.jpg";
// import room_image2 from "../../assets/room_image2.jpg";
// import room_image3 from "../../assets/room_image3.jpg";
import {
  HomeIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function RoomDetails({ residentId }) {
  const [roomDetails, setRoomDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [rendered, setRendered] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  
  // Navigate hook
  const navigate = useNavigate();
  useEffect(() => {
    const fetchResidentRoomDetails = async () => {
      try {
        const response = await API.get(`/resident/room/${residentId}`);
        console.log(response.data);
        setRoomDetails(response.data.roomDetails);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);

        setTimeout(() => setRendered(true), 1000); // Delay to ensure DOM is ready
      }
    };

    fetchResidentRoomDetails();
    setLoading(false);
    setTimeout(() => setRendered(true), 100); // Delay to ensure DOM is ready

    setInterval(updateDate, 1000);
  }, [residentId]);

  const updateDate = () => {
    setCurrentDate(
      new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    );
  };

  if (loading) {
    return (
      <div className="h-fit bg-gradient-to-br from-green-50 to-blue-50 p-8">
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
      <>
        <div className="mb-2">
          <h3 className="text-2xl font-semibold mb-1">Hey {"User"}!</h3>
          {/* Real-time date and time display */}
          <p className="text-gray-500 mb-4">{currentDate}</p>
          <hr />
        </div>
        {roomDetails.roomNumber ? (
          <>
            <div className="mx-auto max-w-4xl">
              <h1 className="text-4xl font-bold text-gray-800 mb-8">
                Your Room Details
              </h1>

              <div className="grid gap-6 md:grid-cols-2">
                <div
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    rendered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  <div className="bg-green-100 p-4">
                    <h2 className="flex items-center text-xl font-semibold text-gray-800">
                      <HomeIcon className="h-6 w-6 text-gray-500" />
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
                    rendered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <div className="bg-blue-100 p-4">
                    <h2 className="flex items-center text-xl font-semibold text-gray-800">
                      <CalendarDaysIcon className="h-6 w-6 text-gray-500" />
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
                        {new Date(
                          roomDetails.checkOutDate
                        ).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    rendered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <div className="bg-green-100 p-4">
                    <h2 className="flex items-center text-xl font-semibold text-gray-800">
                      <CreditCardIcon className="h-6 w-6 text-gray-500" />
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
                    rendered
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <div className="bg-blue-100 p-4">
                    <h2 className="flex items-center text-xl font-semibold text-gray-800">
                      <UsersIcon className="h-6 w-6 text-gray-500" />
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
            <div className="flex justify-center mt-8">
              <button
                onClick={() => navigate(`/resident/invoice/${residentId}`)}
                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <h1>No Room assigned</h1>
        )}
      </>
    </div>
  );
}

export default RoomDetails;
