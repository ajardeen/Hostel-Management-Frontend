import React from "react";
import { useEffect, useState } from "react";
import API from "../api/axios";
import RoomCard from "./RoomCard";
function Rooms() {
  const [rooms, setRooms] = useState([]);

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
  useEffect(() => {
    fetchRoomDetailsAPI();
  }, []);

  return (
    <div className="container mx-auto mt-3">
      <div className="text-3xl font-bold mb-6 pl-3">Rooms</div>
      <div className="border-2 border-blue-400"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default Rooms;
