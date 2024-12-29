import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from 'react-toastify';
import RegisterExpense from "./RegisterExpense";
const Maintenance = () => {
  const [loading, setLoading] = useState(true);
  const [editedIssue, setEditedIssue] = useState(null);
  const [maintenanceIssue, setMaintenanceIssue] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  
  // Fetch issues from API
  const fetchIssues = async () => {
    try {
      await API
        .get("/maintenance/maintenance-requests")
        .then((res) => {
          setMaintenanceIssue(res.data);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to fetch maintenance issues");
        })
        .finally(setLoading(false));
    } catch (error) {
      console.log(error);
      toast.error("Error fetching maintenance issues");
    }
  };

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        await API
          .get("/maintenance/getstaffs")
          .then((res) => {
            setStaffs(res.data.staff);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to fetch staff list");
          })
          .finally(setLoading(false));
      } catch (error) {
        console.log(error);
        toast.error("Error fetching staff list");
      }
    };

    fetchIssues();
    fetchStaffs();
  }, []);

  const handleUpdateClick = (issue) => {
    setEditedIssue(issue);
  };

  const handleDeleteClick = (issue) => {
    setIssueToDelete(issue);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await API.delete(`/maintenance/maintenance-requests/${issueToDelete._id}`);
      toast.success("Maintenance issue deleted successfully");
      fetchIssues();
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete maintenance issue");
    }
  };

  const handleSave = async (issueId) => {
    try {
      const assignedTo = staffs.find((staff) => staff.username === selectedStaff)?._id;
      const id = issueId;
      
      await API
        .put("/maintenance/maintenance-requests/assign", {
          assignedTo,
          id
        })
        .then((res) => {
          console.log(res.data);
          
          toast.success("Staff assigned successfully");
          fetchIssues();
          setEditedIssue(null);
          setSelectedStaff("");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to assign staff");
        })
        .finally(setLoading(false));
    } catch (error) {
      console.log(error);
      toast.error("Error assigning staff");
    }
  };

    const handleCreateExpenseClick = () => {
        setShowExpenseModal(true);
    };

    const handleCloseExpenseModal = () => {
        setShowExpenseModal(false);
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
    <div className="max-w-7xl mx-auto p-6 bg-gray-100">
    <div className="flex justify-end">
      <button 
        onClick={handleCreateExpenseClick}
        className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full group hover:border-blue-700"
        >
        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mr-2 inline-block">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Create Expense</span>
        <span className="relative invisible">Create Expense</span>
      </button>
    </div>
    {showExpenseModal && <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
                <div className="flex justify-end">
                    <button onClick={handleCloseExpenseModal} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <RegisterExpense onClose={handleCloseExpenseModal}/>
            </div>
        </div>
    </div>}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Maintenance Issues
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {maintenanceIssue.map((issue) => (
              <tr key={issue._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    issue.priority === 'High' ? 'bg-red-100 text-red-800' :
                    issue.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {issue.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    issue.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                    issue.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {issue.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">{issue.issueDetails}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-900">
                    {issue.assignedTo == null ? "Not assigned" : 
                      staffs.find((staff) => staff._id === issue.assignedTo)?.username
                    }
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-gray-900">{new Date(issue.createdAt).toLocaleString()}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700"
                      onClick={() => handleUpdateClick(issue)}
                    >
                      Assign
                    </button>
                    <button
                      className="px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700"
                      onClick={() => handleDeleteClick(issue)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Assign Staff</h3>
            <div className="flex flex-col">
              <label htmlFor="staffs" className="text-gray-700 mb-2">
                Select Staff
              </label>
              <select
                id="staffs"
                value={selectedStaff}
                onChange={(e) => setSelectedStaff(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Staff</option>
                {staffs.map((staff) => (
                  <option key={staff._id} value={staff.username}>
                    {staff.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                onClick={() => handleSave(editedIssue._id)}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600"
                onClick={() => setEditedIssue(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this maintenance issue? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
        
    </div>
  );
};

export default Maintenance;