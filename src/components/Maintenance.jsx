import React, { useEffect, useState } from "react";
import axios from "axios";
const Maintenance = () => {
  const [loading, setLoading] = useState(true);
  const [editedIssue, setEditedIssue] = useState(null);
 
  
  const [maintenanceIssue, setMaintenanceIssue] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [selectedRequestId, setSelectedRequestId] = useState("");
  //api url
  const api = import.meta.env.VITE_API_URL;


  
  // Fetch issues from API
  const fetchIssues = async () => {
    try {
      await axios
        .get(api + "/maintenance/maintenance-requests")
        .then((res) => {
          setMaintenanceIssue(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        await axios
          .get(api + "/maintenance/getstaffs")
          .then((res) => {
            setStaffs(res.data.staff);
           
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(setLoading(false));
      } catch (error) {
        console.log(error);
      }
    };

    fetchIssues();
    fetchStaffs();
  }, []);
 

  // Handle edit click
  const handleUpdateClick = (issue) => {
    setEditedIssue(issue);
  };

  // Handle save
  const handleSave = async (issueId) => {
    try {
      const assignedTo = staffs.find((staff) => staff.username === selectedStaff)?._id;
      const id = issueId;
      
      await axios
        .put(api + "/maintenance/maintenance-requests/assign", {
          assignedTo,
          id
        })
        .then((res) => {
          fetchIssues(); // Fetch updated data after successful assignment
          setEditedIssue(null); // Close the edit form
          setSelectedStaff(""); // Reset selected staff
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(setLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 animate-[spin_0.8s_linear_infinite] fill-blue-600 block mx-auto"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
              data-original="#000000"
            />
          </svg>
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl min-h-screen  p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Maintenance Issues
      </h2>
      <div className="space-y-6">
        {maintenanceIssue.map((issue) => (
          <div
            key={issue._id}
            className="p-4 bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <div>
                <p>Assigned To: {issue.assignedTo == null ? "not assigned" : staffs.find((staff) => staff._id === issue.assignedTo)?.username}</p>
                <p className="text-gray-700">
                  <strong>Issue:</strong> {issue.issueDetails}
                </p>
                <p className="text-gray-700">
                  <strong>Priority:</strong> {issue.priority}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {issue.status}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Created At:</strong>{" "}
                  {new Date(issue.createdAt).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">
                  <strong>Updated At:</strong>{" "}
                  {new Date(issue.updatedAt).toLocaleString()}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <button
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleUpdateClick(issue)}
                >
                  Assign Staff
                </button>
              </div>
            </div>

            {editedIssue && editedIssue._id === issue._id && (
              <div className="mt-4 p-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Staffs Field */}
                  <div className="flex flex-col">
                    <label htmlFor="staffs" className="text-gray-700">
                      Staffs
                    </label>
                    <select
                      id="staffs"
                      value={selectedStaff}
                      onChange={(e) => {
                        setSelectedStaff(e.target.value);
                      }}
                      className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select Staff</option>
                      {staffs.map((staff) => (
                        <option key={staff._id} value={staff.username}>
                          {staff.username}
                        </option>
                      ))}
                    </select>
                  </div>


                </div>
                <div className="mt-4 flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => {
                      handleSave(issue._id);
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    onClick={() => setEditedIssue(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Maintenance;