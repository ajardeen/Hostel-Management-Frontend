import React, { useState, useEffect } from "react";
import API from "../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  useEffect(() => {
    console.log("Assignments:", assignments);
  }, [assignments]);
  const fetchAssignments = async () => {
    try {
      const response = await API.get("/getAllAssignedRooms");
      const data = response.data.roomAssignments;
      setAssignments(data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleEdit = (assignment) => {
    const formattedAssignment = {
      ...assignment,
      checkInDate: new Date(assignment.checkInDate).toISOString().split("T")[0],
      checkOutDate: new Date(assignment.checkOutDate)
        .toISOString()
        .split("T")[0],
    };
    setSelectedAssignment(formattedAssignment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedAssignment(null);
    setIsModalOpen(false);
  };

  const handleDelete = (assignment) => {
    setAssignmentToDelete(assignment);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/deleteRoomAssignment/${assignmentToDelete._id}`);
      setAssignments(
        assignments.filter((a) => a._id !== assignmentToDelete._id)
      );
      toast.success("Assignment deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete assignment");
      console.error("Error deleting assignment:", error);
    }
    setShowDeleteConfirm(false);
    setAssignmentToDelete(null);
  };

  const handleSubmit = async () => {
    console.log("Selected Assignment:");
    try {
      const data = {
        checkInDate: new Date(selectedAssignment.checkInDate).toISOString(),
        checkOutDate: new Date(selectedAssignment.checkOutDate).toISOString(),
      };

      await API.put(`/updateRoomAssignmentsDates/${selectedAssignment._id}`, {
        data,
      }).then((response) => {
        console.log("Response:", response.data);
        fetchAssignments();
        toast.success("Assignment updated successfully!");
      });

      const updatedAssignments = assignments.map((assignment) =>
        assignment._id === selectedAssignment._id
          ? { ...assignment, ...data }
          : assignment
      );

      setAssignments(updatedAssignments);
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to update assignment");
      console.error("Error updating assignment:", error);
    }
  };

  return (
    <>
      <div className="p-6">
       
        <h2 className="text-lg font-semibold text-gray-700">
          Manage Assignments
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          See all currently active assignments.
        </p>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Room Number
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Resident
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Check-In
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Check-Out
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-800">
                    {assignment.roomId}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {assignment.residentId}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {new Date(assignment.checkInDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-gray-800">
                    {new Date(assignment.checkOutDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        assignment.status === "Occupied"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(assignment)}
                      className="text-blue-600 font-medium text-sm hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(assignment)}
                      className="text-red-600 font-medium text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Assignment
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Room ID
                  </label>
                  <input
                    type="text"
                    value={selectedAssignment.roomId}
                    onChange={(e) =>
                      setSelectedAssignment({
                        ...selectedAssignment,
                        roomId: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Resident ID
                  </label>
                  <input
                    type="text"
                    value={selectedAssignment.residentId}
                    onChange={(e) =>
                      setSelectedAssignment({
                        ...selectedAssignment,
                        residentId: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Check-In
                  </label>
                  <input
                    type="date"
                    value={selectedAssignment.checkInDate}
                    onChange={(e) =>
                      setSelectedAssignment({
                        ...selectedAssignment,
                        checkInDate: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Check-Out
                  </label>
                  <input
                    type="date"
                    value={selectedAssignment.checkOutDate}
                    onChange={(e) =>
                      setSelectedAssignment({
                        ...selectedAssignment,
                        checkOutDate: e.target.value,
                      })
                    }
                    className="w-full border rounded p-2 mt-1"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleSubmit();
                    handleCloseModal();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Confirm Delete
              </h3>
              <p className="text-gray-600">
                Are you sure you want to delete this assignment?
              </p>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    confirmDelete();
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default ManageAssignments;
