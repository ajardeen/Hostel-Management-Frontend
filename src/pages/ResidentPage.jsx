import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateIssue from "../components/Resident/CreateIssue";
import ResidentRequestStatus from "../components/Resident/ResidentRequestStatus";
import SidePanel from "../components/SidePanel";
import { useState, useMemo } from "react";
import RoomDetails from "../components/Resident/RoomDetails";
import Invoice from "../components/BillingAndPayment/Invoice";
import Payment from "../components/BillingAndPayment/Payment";
import AccountDetails from "../components/Resident/AccountDetails";
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
  const residentId = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.userid : "id not found";
  }, []);

  return (
    <div className="flex gap-5 bg-[#f5f7f9] m-2 rounded-tl-3xl ">
      <SidePanel options={options} />
      <div className="bg-white p-5 mt-5 min-w-[75rem] max-h-[43rem] border-2  rounded-tl-3xl ">
        <Routes>
          <Route
            path="/create-issue"
            element={<CreateIssue residentId={residentId} />}
          />
          <Route
            path="/resident-request-status"
            element={<ResidentRequestStatus residentId={residentId} />}
          />
          <Route path="/invoice/:residentId" element={<Invoice />} />
          <Route path="/payment/:residentId" element={<Payment />} />
          <Route
            path="/account"
            element={<AccountDetails residentId={residentId} />}
          />
          <Route path="/" element={<RoomDetails residentId={residentId} />} />
        </Routes>
      </div>
    </div>
  );
}

export default ResidentPage;
