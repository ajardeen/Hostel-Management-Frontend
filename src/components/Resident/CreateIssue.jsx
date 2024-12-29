import React, { useState } from "react";
import API from "../../api/axios";
const CreateIssue = ({ residentId ,roomId}) => {
  const [issueDetails, setIssueDetails] = useState("");
  const [priority, setPriority] = useState("Low");
  console.log(roomId,residentId);
  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIssue = { residentId, issueDetails, priority ,roomId};
    try {
     await API.post("/maintenance/create-maintenance-requests",
       newIssue
      ).then((res) => {
        console.log(res.data);
        alert("Issue reported successfully!");
      })
      .catch((err) => {
        console.log(err);
      })

    } catch (error) {
    
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      {roomId ? (
        <>
          <h2 className="text-2xl font-semibold text-primary-dark mb-6">Report an Issue</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resident ID Display */}
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Resident ID
              </label>
              <input
                type="text"
                value={residentId || ""}
                readOnly
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Issue Details Field */}
            <div>
              <label
                htmlFor="issueDetails"
                className="block text-sm font-medium text-gray-600"
              >
                Issue Details
              </label>
              <textarea
                id="issueDetails"
                value={issueDetails}
                onChange={(e) => setIssueDetails(e.target.value)}
                required
                placeholder="Describe the issue..."
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                rows="4"
              ></textarea>
            </div>

            {/* Priority Select Field */}
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-600"
              >
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white bg-black font-medium rounded-md hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Submit Issue
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="text-center">
          <span role="img" aria-label="sad" className="text-6xl animate-bounce">
            😞
          </span>
          <p className="mt-4 text-gray-600">
            You don't have any assigned room.
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateIssue;
