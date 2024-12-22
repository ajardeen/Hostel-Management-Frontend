import React, { useState } from "react";
import AdminDashboard from "../components/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import RoomForm from "../components/RoomForm";
import Rooms from "../components/Rooms";
import Maintenance from "../components/Maintenance";
import RoomBooking from "../components/RoomBooking";
import SidePanel from "../components/SidePanel";
import Billing from "../components/BillingAndPayment/Invoice";
import Checkout from "../components/BillingAndPayment/Payment";
import {
  HomeIcon,
  UserIcon,
  KeyIcon,
  PlusCircleIcon,
  BriefcaseIcon,
  WrenchIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/solid";

function AdminPage() {
  const[currentDate, setCurrentDate] = useState("");

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
    { name: "Admin Dashboard", link: "/admin", icon: icons.dashboard },
    { name: "Room Form", link: "/admin/roomform", icon: icons.form },
    { name: "Rooms", link: "/admin/rooms" , icon: icons.room},
    { name: "Maintenance", link: "/admin/maintenance" , icon: icons.maintenance},
  ]);

  //real-time date and time display function
  
  const updateDate = () => {
    setCurrentDate( new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }));
  };

  setInterval(updateDate, 1000);

  return (
    <div className="flex gap-5 bg-[#f5f7f9] m-2 rounded-tl-3xl ">
      {/* <UserNavBar /> */}
      <SidePanel options={options} />
      {/* Routes for different components */}
      <div className="bg-white p-5 mt-5 min-w-[75rem] max-h-[43rem] border-2  rounded-tl-3xl overflow-y-scroll">
        <div className="mb-2">
          <h3 className="text-2xl font-semibold mb-1">Hey {"User"}!</h3>
        {/* Real-time date and time display */}
        <p className="text-gray-500 mb-4">
          {currentDate}
        </p>
        <hr />
        </div>
       
        <Routes>
          <Route path="/roomform" element={<RoomForm />} />
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/rooms/book-room/:roomid" element={<RoomBooking />} />
          <Route path="/invoice" element={<Billing />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
