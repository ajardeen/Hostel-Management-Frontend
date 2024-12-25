import React from "react";
import { useEffect, useState } from "react";
import API from "../api/axios";
import RoomCard from "./RoomCard";
import { TrashIcon } from "@heroicons/react/24/outline";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const fetchRoomDetailsAPI = async () => {
    try {
      await API
        .get("/getrooms")
        .then((res) => {
          console.log(res.data);
          setRooms(res.data.allRooms);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/deleteRoom/${id}`);
      fetchRoomDetailsAPI();
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoomDetailsAPI();
  }, []);

  const filteredRooms = rooms.filter((room) =>
    room.roomNumber.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-3">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold pl-3">Rooms</div>
        <div className="flex gap-4 pr-3">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View All
          </button>
          <input
            type="text"
            placeholder="Search by room number"
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="border-2 border-blue-400"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {filteredRooms.map((room,index) => (
          <RoomCard key={index} room={room} />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto animate-[fadeIn_0.3s_ease-in-out]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">All Rooms</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Room Number</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Capacity</th>
                  <th className="p-2">Occupied</th>
                  <th className="p-2">Features</th>
                  <th className="p-2">Fees</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id} className="border-b">
                    <td className="p-2 text-center">{room.roomNumber}</td>
                    <td className="p-2 text-center">{room.type}</td>
                    <td className="p-2 text-center">{room.availabilityStatus}</td>
                    <td className="p-2 text-center">{room.capacity}</td>
                    <td className="p-2 text-center">{room.occupied}</td>
                    <td className="p-2 text-center">
                      {room.features.AC ? "AC, " : ""}{room.features.WIFI ? "WiFi" : ""}
                    </td>
                    <td className="p-2 text-center">${room.roomfees}</td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => {
                          setSelectedRoomId(room._id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg animate-[fadeIn_0.3s_ease-in-out]">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this room?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedRoomId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Rooms;