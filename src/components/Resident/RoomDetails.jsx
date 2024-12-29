import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import room_image1 from "../../assets/room_image 1.jpg";
// import room_image2 from "../../assets/room_image2.jpg";
// import room_image3 from "../../assets/room_image3.jpg";
import {
  HomeIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function RoomDetails({ residentId ,username,getRoomId}) {
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
        getRoomId(response.data.roomDetails.roomId);
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
      <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <div className=" ">
          <div className=" mb-8 bg-gray-200 animate-pulse rounded"></div>
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className=" bg-gray-200 animate-pulse rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-br rounded-lg from-blue-50 to-orange-50 p-8 transition-opacity duration-500 ${
          rendered ? "opacity-100" : "opacity-0"
        }`}
      >
        <>
          <div className="mb-2">
            <h3 className="text-2xl font-semibold mb-1 uppercase">Hey! </h3>
            {/* Real-time date and time display */}
            <p className="text-gray-500 mb-4">{currentDate}</p>
            <hr />
          </div>
          {roomDetails.roomNumber ? (
            <>
              <section className="flex relative p-5">
                <HomeIcon className="h-6 w-6 text-gray-500 absolute top-10 right-0" />
                <div>
                  <img
                    src={room_image1}
                    alt="room image"
                    className="w-72 h-60 rounded-md"
                    style={{ transitionDelay: "100ms" }}
                  />
                </div>
                <div className="flex flex-col justify-start ml-5 w-4/12 gap-3">
                  <h2 className="text-4xl font-semibold mb-1 uppercase">
                  {username}
                  </h2>
                  <h2 className="text-2xl font-semibold mb-1">
                    Room : {roomDetails.roomNumber}{" "}
                  </h2>
                  <div className="flex justify-between">
                    <div className="flex flex-col items-start gap-5">
                      <span>
                        <h3 className="font-bold">Check in</h3>
                        <p>
                          {new Date(
                            roomDetails.checkInDate
                          ).toLocaleDateString()}
                        </p>
                      </span>
                      <span className="flex flex-col justify-center">
                        <h3 className="font-bold">Status</h3>
                        <span className="inline-block mt-2 px-2 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                          {roomDetails.roomStatus}
                        </span>
                      </span>
                      <span>
                        <h3 className="font-bold">Guest</h3>
                        <p>{roomDetails.roomOccupancy}</p>
                      </span>
                    </div>
                    <div className="flex flex-col items-start gap-5">
                      <span>
                        <h3 className="font-bold">Check out</h3>
                        <p>
                          {new Date(
                            roomDetails.checkOutDate
                          ).toLocaleDateString()}
                        </p>
                      </span>
                      <div className="flex justify-between">
                        <span>
                          <h3 className="font-bold">Room Type</h3>
                          <p>{roomDetails.roomType}</p>
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          <h3 className="font-bold">Fees</h3>
                          <p>${roomDetails.roomFees}</p>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className=" border-none w-96 p-4">
                      <h2 className="flex items-center text-xl font-semibold text-gray-800">
                        <UsersIcon className="h-6 w-6 text-gray-500" />
                        Amenities
                      </h2>
                      <div className="border-2 border-orange-300"></div>
                    </div>
                    <div className="p-4 py-2">
                      <ul className="list-disc list-inside text-gray-600">
                        <li>Free Wi-Fi</li>
                        <li>Air Conditioning</li>
                        <li>Daily Housekeeping</li>
                        <li>24/7 Security</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => navigate(`/resident/invoice/`)}
                  className="inline-flex items-center px-4 py-2 bg-orange-300 border border-transparent rounded-md font-semibold text-black hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                    />
                  </svg>
                  Checkout
                </button>
              </div>
              <hr className="my-4" />
            </>
          ) : (
            <h1>No Room assigned</h1>
          )}
        </>
      </div>
    </>
  );
}

export default RoomDetails;
