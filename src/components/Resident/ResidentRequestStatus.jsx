// ResidentPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ResidentRequestStatus = () => {
  const api = import.meta.env.VITE_API_URL;
  const residentId = localStorage.getItem("userid");
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          api + `/resident/maintenance/${residentId}`
        );
        setMaintenanceRequests(response.data.filteredData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Your Maintenance request
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {maintenanceRequests.map((request, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Status</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    request.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : request.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {request.status}
                </span>
              </div>
              <hr />
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-gray-500 w-24">Issue:</span>
                  <p className="text-gray-700 flex-1">{request.issueDetails}</p>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-500 w-24">Priority:</span>
                  <span
                    className={`px-2 py-1 rounded text-sm
                    ${
                      request.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : request.priority === "Medium"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {request.priority}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-gray-500 w-24">Assigned To : </span>
                  <span className="text-gray-700 uppercase">{request.assignedTo}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResidentRequestStatus;
