import React, { useState, useEffect } from "react";
import API from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StaffMaintenanceRequests = ({ requestId }) => {
  const [requests, setRequests] = useState();
  const [status, setStatus] = useState("Resolved");
  const fetchStaffMaintenanceRequests = async () => {
    const id = requestId;
    try {
      await API.get(`/maintenance-requests/${id}`)
        .then((res) => {
          console.log(res.data.maintenanceRequests);
          setRequests(res.data.maintenanceRequests);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchStaffMaintenanceRequests();
  }, [requestId]);
  const updateStatus = async (id) => {
    if (window.confirm("Are you sure you want to update the status?")) {
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === id ? { ...request, status: "Completed" } : request
        )
      );
      try {
        await API.put(`/maintenance/maintenance-requests/${id}/status`, {
          status,
        }).then((res) => {
          console.log(res);
          toast.success("Task completed");
          fetchStaffMaintenanceRequests();
        });
      } catch (error) {
        console.log(error);
        toast.error("error updated task");
      }
    } else {
      toast.success("Cancelled");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Maintenance Requests</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests
          ? requests.map((request) => (
              <div
                key={request._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-lg font-semibold mb-2">
                  Issue: {request.issueDetails}
                </h2>
                <p>
                  <strong>Priority:</strong> {request.priority}
                </p>
                <p>
                  <strong>Status:</strong> {request.status}
                </p>
                <p>
                  <strong>Assigned To:</strong> {request.assignedTo}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(request.createdAt).toLocaleString()}
                </p>
                <p>
                  <strong>Updated At:</strong>{" "}
                  {new Date(request.updatedAt).toLocaleString()}
                </p>

                <button
                  className={
                    request.status !== "Resolved"
                      ? "mt-4 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                      : "mt-4 px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  }
                  onClick={() => updateStatus(request._id)}
                >
                  {request.status !== "Resolved"
                    ? "Mark as Completed"
                    : "Resolved"}
                </button>
              </div>
            ))
          : null}
      </div>
      <ToastContainer />
    </div>
  );
};

export default StaffMaintenanceRequests;