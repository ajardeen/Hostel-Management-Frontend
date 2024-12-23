import React, { useEffect, useState } from "react";
import LineChart from "../ChartsAndGraphs/LineChart";
import InfoContainer from "../components/InfoContainer";
import API from "../api/axios";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(false);

  useEffect(() => {
    console.log(dashboardData);
  }, [dashboardData]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await API.get("/dashboard");
        setDashboardData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <>
      {dashboardData ? (
        <div>
          <section className="flex gap-4">
            <div className="shadow-lg p-10">
              <LineChart />
            </div>
            <div className="w-full bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Staff Details
              </h1>
              <hr className="mb-4 border-gray-200" />
              <div className="grid gap-3">
                {dashboardData.staffData.staffNames.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors uppercase"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      {name.charAt(0)}
                    </div>
                    <span className="ml-3 text-gray-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <hr className="mt-10" />
          <section className="flex gap-1">
            <div className="flex mt-1">
              <InfoContainer
                value={dashboardData.roomData.netWorth}
                title={"Net Profit"}
                icon={
                  <span className="absolute right-0 bottom-10 opacity-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>
                }
              />
              <InfoContainer
                value={dashboardData.expensesData.totalExpenses}
                title={"Expense"}
                icon={
                  <span className="absolute right-0 bottom-10 opacity-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>
                }
              />
              <InfoContainer
                color={"blue"}
                value={dashboardData.revenueData.totalRevenue}
                title={"Revenue"}
                icon={
                  <span className="absolute right-0 bottom-10 opacity-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-20"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </span>
                }
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">Total Rooms</p>
                <p className="text-2xl font-bold">
                  {dashboardData.roomData.totalRooms}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">Occupied Rooms</p>
                <p className="text-2xl font-bold">
                  {dashboardData.roomData.occupiedRooms}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">Available Rooms</p>
                <p className="text-2xl font-bold">
                  {dashboardData.roomData.availableRooms}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">Active Assignments</p>
                <p className="text-2xl font-bold">
                  {dashboardData.roomData.activeAssignments}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <p className="text-gray-600 text-sm">InActive Assignments</p>
                <p className="text-2xl font-bold">
                  {dashboardData.roomData.inActiveAssignments}
                </p>
              </div>
            </div>{" "}
          </section>
        </div>
      ) : null}
    </>
  );
}

export default AdminDashboard;
