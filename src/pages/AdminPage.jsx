import React, { useState } from "react";
import UserNavBar from "../components/UserNavBar";
import AdminDashboard from "../components/AdminDashboard";
import { Routes, Route } from "react-router-dom";
import RoomForm from "../components/RoomForm";
import Rooms from "../components/Rooms";
import Maintenance from "../components/Maintenance";
import RoomBooking from "../components/RoomBooking";
import SidePanel from "../components/SidePanel";
import Billing from "../components/BillingAndPayment/Invoice";
import Checkout from "../components/BillingAndPayment/CheckOut";
function AdminPage() {
  const [options, setOptions] = useState([
    { name: "Admin Dashboard", link: "/admin" },
    { name: "Room Form", link: "/admin/roomform" },
    { name: "Rooms", link: "/admin/rooms" },
    { name: "Maintenance", link: "/admin/maintenance" },
  ]);

  return (
    <>
      <UserNavBar />
      <SidePanel options={options} />
      {/* Routes for different components */}
      <div className=" p-10  absolute top-20 left-64 min-w-[65rem] max-w-[77rem] min-h-[85vh] border-2 border-blue-800 ">
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
    </>
  );
}

export default AdminPage;
