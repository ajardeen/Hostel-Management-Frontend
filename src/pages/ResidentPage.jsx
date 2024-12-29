import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateIssue from "../components/Resident/CreateIssue";
import ResidentRequestStatus from "../components/Resident/ResidentRequestStatus";
import SidePanel from "../components/SidePanel";
import { useState, useMemo,useCallback } from "react";
import RoomDetails from "../components/Resident/RoomDetails";
import Invoice from "../components/BillingAndPayment/Invoice";
import AccountDetails from "../components/Resident/AccountDetails";
import {
  HomeIcon,
  UserIcon,
  KeyIcon,
  PlusCircleIcon,
  BriefcaseIcon,
  WrenchIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";


function ResidentPage() {
  const [roomId, setRoomId] = useState(null);

  const getRoomId = useCallback((id) => {
    setRoomId(id);
  })
   const icons = {
      dashboard: <HomeIcon className="h-6 w-6 text-gray-500" />,
      account: <UserIcon className="h-6 w-6 text-gray-500" />,
      room: <KeyIcon className="h-6 w-6 text-gray-500" />,
      createRoom: <PlusCircleIcon className="h-6 w-6 text-gray-500" />,
      assignRoom: <BriefcaseIcon className="h-6 w-6 text-gray-500" />,
      maintenance: <WrenchIcon className="h-6 w-6 text-gray-500" />,
      form: <ClipboardDocumentIcon className="h-6 w-6 text-gray-500" />,
    };
  const [options, setOptions] = useState([
    { name: "Room Details", link: "/resident", icon:icons.room  },
    { name: "Create Issue", link: "/resident/create-issue", icon: icons.createRoom },
    {
      name: "Request Status",
      link: "/resident/resident-request-status",
      icon: icons.form,
    },
  ]);
const username = useMemo(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      return userData ? userData.username : "username";
    }, []);
  
  const useremail = useMemo(() => {
      const userInfo = JSON.parse(localStorage.getItem("userData"));
      console.log(userInfo);
      
      return userInfo ? userInfo.email : "useremail";
    }, []);
    
   const residentId = useMemo(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      return userData ? userData.userid : "id not found";
    }, []);
   const role = useMemo(() => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      return userData ? userData.role : "role not found";
    }, []);
  return (
    <div className="flex gap-5 bg-[#f5f7f9] m-2 rounded-tl-3xl ">
      <SidePanel options={options} username={username} useremail={useremail}/>
      <div className="bg-white p-5 mt-5 w-[70rem] h-[42rem] border-2  overflow-y-scroll rounded-tl-3xl">
        <Routes>
          <Route
            path="/create-issue"
            element={<CreateIssue residentId={residentId} roomId={roomId} />}
          />
          <Route
            path="/resident-request-status"
            element={<ResidentRequestStatus residentId={residentId} />}
          />
          <Route
            path="/invoice"
            element={<Invoice residentId={residentId} />}
          />
          <Route
            path="/account"
            element={<AccountDetails residentId={residentId} role={role} />}
          />
          <Route path="/" element={<RoomDetails residentId={residentId} username={username} getRoomId={getRoomId} />} />
        </Routes>
      </div>
    </div>
  );
}

export default ResidentPage;
