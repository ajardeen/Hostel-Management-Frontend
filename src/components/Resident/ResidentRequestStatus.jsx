import React, { useState, useEffect } from "react";
import API from "../../api/axios";

const ResidentRequestStatus = ({ residentId }) => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await API.get(`/resident/maintenance/${residentId}`);
        setMaintenanceRequests(response.data.filteredData);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
      }
    };
    fetchRequests();
  }, [residentId]);

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 border-b pb-4">
        Maintenance Requests Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {maintenanceRequests.map((request,index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 ease-in-out p-6"
          >
            {/* Status Badge */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800 uppercase">Status</h2>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium
                ${
                  request.status === "In Progress"
                    ? "bg-amber-100 text-amber-700 border border-amber-200"
                    : request.status === "Completed"
                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {request.status}
              </span>
            </div>

            {/* Issue Details */}
            <p className="text-gray-600 bg-gray-50 p-3 rounded-md text-sm mb-4">
              Request : {request.issueDetails}
            </p>

            {/* Priority and Assigned To */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-500">Priority</span>
                <span
                  className={`mt-1 px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    request.priority === "High"
                      ? "bg-rose-100 text-rose-700 border border-rose-200"
                      : request.priority === "Medium"
                      ? "bg-orange-100 text-orange-700 border border-orange-200"
                      : "bg-sky-100 text-sky-700 border border-sky-200"
                  }`}
                >
                  {request.priority}
                </span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <span className="text-sm font-medium text-gray-500">Assigned To</span>
                <div className="flex items-center gap-2">
                
                  <span className="text-sm p-1 px-2 bg-orange-100 text-orange-700 border border-orange-200 rounded-full ">{request.assignedTo}</span>
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
