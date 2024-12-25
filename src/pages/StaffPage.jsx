import React, { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import SidePanel from "../components/SidePanel";

import {
  HomeIcon,
  UserIcon,
  KeyIcon,
  PlusCircleIcon,
  BriefcaseIcon,
  WrenchIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";
import AccountDetails from "../components/Resident/AccountDetails";
import StaffMaintenanceRequests from "../components/Staffs/StaffMaintenanceRequests";

function StaffPage() {
  const [currentDate, setCurrentDate] = useState("");


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
    { name: "Maintenance", link: "/staff", icon: icons.maintenance },
  ]);

  //real-time date and time display function

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

  setInterval(updateDate, 1000);
  const username = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.username : "username";
  }, []);

  const useremail = useMemo(() => {
    const userInfo = JSON.parse(localStorage.getItem("userData"));
    return userInfo ? userInfo.email : "useremail";
  }, []);

  const requestId = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.userid : "id not found";
  }, []);
  const role = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.role : "role not found";
  }, []);

 
  return (
    <div className="flex gap-5 bg-[#f5f7f9] m-2 rounded-tl-3xl ">
      
      {/* <UserNavBar /> */}
      <SidePanel options={options} username={username} useremail={useremail} />
      {/* Routes for different components */}
      <div className="bg-white p-5 mt-5 min-w-[75rem] max-h-[43rem] border-2  rounded-tl-3xl overflow-y-scroll">
        <div className="mb-2">
          <span className="flex items-center gap-2  ">
          <h3 className="text-2xl font-semibold mb-1">Hey {username}!</h3> 
          <h4 className="uppercase text-xs text-green-900  bg-green-300  w-fit px-3 py-1 rounded-xl">{role}</h4>
          </span>
          {/* Real-time date and time display */}
          <p className="text-gray-500 mb-4">{currentDate}</p>
          <hr />
        </div>

        <Routes>
          <Route path="/" element={<StaffMaintenanceRequests requestId={requestId}/>} />
          <Route
            path="/account"
            element={<AccountDetails residentId={requestId} role={role} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default StaffPage;
