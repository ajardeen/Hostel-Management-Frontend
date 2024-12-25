import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RoomBooking() {
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const [residents, setResidents] = useState([]);
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
    },
  });

  useEffect(() => {
    console.log("residents=", residents);
  }, [residents]);

  useEffect(() => {
    const fetchRoomDetailsAPI = async () => {
      try {
        const res = await API.get(`/getroombyid/${roomid}`);
        setRoom(res.data.room);
        setResidents(res.data.filteredResidentData);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch room details");
      }
    };

    fetchRoomDetailsAPI();
  }, [roomid]);

  useEffect(() => {
    setBookingData({
      ...bookingData,
      residentId: residents.find(
        (resident) => resident.username === selectedResidentId
      )?.residentId,
    });
  }, [selectedResidentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedResidentId === "selectedResidentId") {
      toast.error("Please select a resident");
      return;
    }

    try {
      const res = await API.post("/room-assignment", bookingData);
      if(res){
        toast.success(res.data.message);
        setTimeout(() => {
          navigate('/admin/rooms');
        }, 2000);
      }
      
     
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/rooms')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Rooms
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Room Booking
          </h1>

          <div className="mt-4 md:mt-0 p-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="font-semibold">Room #{room.roomNumber}</p>
                <p>Type: {room.type}</p>
                <p>Capacity: {room.capacity}</p>
              </div>
              <div className="space-y-2">
                <p>Status: <span className="font-medium text-green-600">{room.availabilityStatus}</span></p>
                <p>Occupied: {room.occupied}/{room.capacity}</p>
                <p>Features: {room.features?.AC ? "AC, " : ""}{room.features?.WIFI ? "WiFi" : ""}</p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check In Date</label>
              <input
                type="date"
                value={bookingData.checkInDate}
                onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check Out Date</label>
              <input
                type="date"
                value={bookingData.checkOutDate}
                onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Occupants</label>
              <input
                type="number"
                value={bookingData.occupied}
                onChange={(e) => setBookingData({ ...bookingData, occupied: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                max={(room.capacity - room.occupied) || 1}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={bookingData.status}
                onChange={(e) => setBookingData({ ...bookingData, status: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Checked In">Checked In</option>
                <option value="Checked Out">Checked Out</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Resident</label>
              <select
                onChange={(e) => setSelectedResidentId(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="selectedResidentId">Select a resident</option>
                {residents.map((resident, index) => (
                  <option key={index} value={resident.username}>
                    {resident.username}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Room Preferences</label>
              <div className="p-4 bg-gray-50 rounded-lg min-h-[60px]">
                {room.preferences || "No preferences set"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resident Preferences</label>
              <div className={`p-4 rounded-lg min-h-[60px] ${
                selectedResidentId && residents.find((r) => r.username === selectedResidentId)?.preferences.includes(room.preferences)
                  ? "bg-green-50"
                  : "bg-red-50"
              }`}>
                {selectedResidentId
                  ? residents.find((r) => r.username === selectedResidentId)?.preferences || "No preferences"
                  : "Select a resident to see preferences"}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200"
            >
              Complete Booking
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RoomBooking;