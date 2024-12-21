import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import RoomCard from "./RoomCard";
function Rooms() {
  const admin_api = import.meta.env.VITE_ADMIN_API_URL;
  const [rooms, setRooms] = useState([]);

  const fetchRoomDetailsAPI = async () => {
    try {
      await axios
        .get(admin_api + "/getrooms")
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
  useEffect(() => {
    fetchRoomDetailsAPI();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <div className="text-3xl font-bold mb-6">Rooms</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Rooms;
