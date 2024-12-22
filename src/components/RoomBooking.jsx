import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function RoomBooking() {
  const [room, setRoom] = useState({});
  const [residents, setResidents] = useState([]);
  const adminAPI = import.meta.env.VITE_ADMIN_API_URL;
  const { roomid } = useParams();
  const [selectedResidentId, setSelectedResidentId] = useState(null);
  const [bookingData, setBookingData] = useState({
    residentId: "",
    roomId: roomid,
    occupied: 1,
    checkInDate: "",
    checkOutDate: "",
    status: "Checked In",
    utilities: { 
        washing: 200,
        electricity: 500,
        water: 0,
        internet: 0,
        maintenance: 200,
        cleaning: 150,
      }
  });

  //api url
  const admin_api = import.meta.env.VITE_ADMIN_API_URL;
  useEffect(() => {
    console.log("residents=", residents);
  }, [residents]);

  useEffect(() => {
    // Fetch resident details from the API
    const fetchResidentDetailsAPI = async () => {
      try {
        await axios
          .get(`${adminAPI}/getresidents`)
          .then((res) => {
            console.log(res.data);
            setResidents(res.data.residentData);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };

    // Fetch room details from the API
    const fetchRoomDetailsAPI = async () => {
      try {
        await axios
          .get(`${adminAPI}/getroombyid/${roomid}`)
          .then((res) => {
            console.log(res);
            setRoom(res.data.room);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchResidentDetailsAPI();
    fetchRoomDetailsAPI();
  }, []);
  useEffect(() => {
    setBookingData({
      ...bookingData,
      residentId: residents.find(
        (resident) => resident.username === selectedResidentId
      )?.residentid,
    });
  }, [selectedResidentId]);

  // assign room to resident
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedResidentId == "selectedResidentId") {
      alert("Please select a resident");
      return;
    }

    console.log("Booking Data:", bookingData);

    try {
      await axios
        .post(admin_api + "/room-assignment", bookingData)
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data.message);
        });
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div className=" mx-auto mt-10 p-6 bg-white rounded-lg shadow-md ">
      <h2 className="text-2xl font-bold mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 40 40"
        >
          <path
            fill="#dff0fe"
            d="M3.5,38.5V13.3L20,3.6l16.5,9.7v25.2H3.5z"
          ></path>
          <path
            fill="#4788c7"
            d="M20,4.2l16,9.4V38H4V13.6L20,4.2 M20,3L3,13v26h34V13L20,3L20,3z"
          ></path>
          <path
            fill="#b6dcfe"
            d="M20,4.6L1.5,16v-3.1L20,1.6l18.5,11.3V16L20,4.6z"
          ></path>
          <path
            fill="#4788c7"
            d="M20,2.2l18,11v1.9L20.5,4.4L20,4.1l-0.5,0.3L2,15.1v-1.9L20,2.2 M20,1L1,12.6v4.2L20,5.2l19,11.6v-4.2L20,1	L20,1z"
          ></path>
          <path fill="#b6dcfe" d="M14.5,21.5h11v17h-11V21.5z"></path>
          <path
            fill="#4788c7"
            d="M25,22v16H15V22H25 M26,21H14v18h12V21L26,21z"
          ></path>
          <path
            fill="#4788c7"
            d="M23,30c-0.6,0-1,0.4-1,1s0.4,1,1,1s1-0.4,1-1S23.6,30,23,30z"
          ></path>
        </svg>
        Book a Room
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 border rounded-lg bg-gray-50">
          <span className="font-semibold">Room Number:</span>
          <span className="ml-2">{room.roomNumber}</span>
        </div>
        <div className="p-3 border rounded-lg bg-gray-50">
          <span className="font-semibold">Type:</span>
          <span className="ml-2">{room.type}</span>
        </div>
        <div className="p-3 border rounded-lg bg-gray-50">
          <span className="font-semibold">Capacity:</span>
          <span className="ml-2">{room.capacity}</span>
        </div>
        <div className="p-3 border rounded-lg bg-gray-50">
          <span className="font-semibold">Occupied:</span>
          <span className="ml-2">{room.occupied}</span>
        </div>
        <div className="p-3 border rounded-lg bg-gray-50">
          <span className="font-semibold">Availability Status:</span>
          <span className="ml-2">{room.availabilityStatus}</span>
        </div>
        <div className="p-3 border rounded-lg bg-gray-50">
          <span className="font-semibold">Features:</span>
          <span className="ml-2">
            AC: {room.features?.AC ? "Yes" : "No"}, WIFI:{" "}
            {room.features?.WIFI ? "Yes" : "No"}
          </span>
        </div>
      </div>
      <div className="p-3 border rounded-lg bg-green-100 my-2 w-full">
        FILL FORM DATA TO BOOK ROOM
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 gap-x-10 mt-2"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Check In Date</label>
          <input
            type="date"
            name="checkInDate"
            value={bookingData.checkInDate}
            onChange={(e) =>
              setBookingData({ ...bookingData, checkInDate: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Check Out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={bookingData.checkOutDate}
            onChange={(e) => {
              setBookingData({ ...bookingData, checkOutDate: e.target.value });
            }}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Number of Occupants</label>
          <input
            type="number"
            name="occupied"
            value={bookingData.occupied}
            onChange={(e) =>
              setBookingData({ ...bookingData, occupied: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
            min="1"
            max={room.capacity-room.occupied}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={bookingData.status}
            onChange={(e) =>
              setBookingData({ ...bookingData, status: e.target.value })
            }
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="Checked In">Checked In</option>
            <option value="Checked Out">Checked Out</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Room Preferences</label>
          <div className="block text-gray-700 border p-2">
            {room.preferences}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Resident Preferences</label>
          <div
            className={`w-full px-3 py-2 border rounded ${
              selectedResidentId &&
              residents
                .find((r) => r.username === selectedResidentId)
                ?.preferences.includes(room.preferences)
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            {selectedResidentId
              ? residents.find((r) => r.username === selectedResidentId)
                  ?.preferences || "No preferences"
              : "Select a resident to see preferences"}
          </div>
        </div>
        {/* resident select  */}
        <div className="mb-4">
          <label className="block text-gray-700">Select Resident</label>
          <select
            className="w-full px-3 py-2 border rounded"
            onChange={(e) => setSelectedResidentId(e.target.value)}
            required
          >
            <option value="selectedResidentId">Select a resident</option>
            {residents.map((resident) => (
              <option key={resident.residentid} value={resident.username}>
                {resident.username}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Book Room
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default RoomBooking;
