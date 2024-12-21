import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateIssue from "../components/Resident/CreateIssue";
import ResidentRequestStatus from "../components/Resident/ResidentRequestStatus";
import SidePanel from "../components/SidePanel";
import { useState } from "react";
import RoomDetails from "../components/Resident/RoomDetails";
import UserNavBar from "../components/UserNavBar";
function ResidentPage() {
  const [options, setOptions] = useState([
    { name: "Room Details", link: "/resident", icon: "" },
    { name: "Create Issue", link: "/resident/create-issue", icon: "" },
    {
      name: "Request Status",
      link: "/resident/resident-request-status",
      icon: "",
    },
  ]);
  return (
    <>
    <UserNavBar />
      <div className=" p-10  absolute top-20 left-64 min-w-[65rem] max-w-[77rem] min-h-[85vh] border-2 border-blue-800 ">
        <SidePanel options={options} />
        <Routes>
          <Route path="/create-issue" element={<CreateIssue />} />
          <Route
            path="/resident-request-status"
            element={<ResidentRequestStatus />}
          />
          <Route path="/" element={<RoomDetails />} />
        </Routes>
      </div>
    </>
  );
}

export default ResidentPage;
