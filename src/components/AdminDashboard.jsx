import React, { useEffect, useState } from "react";
import LineChart from "../ChartsAndGraphs/LineChart";
import InfoContainer from "../components/InfoContainer";
import API from "../api/axios";
import BarChart from "../ChartsAndGraphs/BarChart";

function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(false);
  const [revenueData, setRevenueData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);

  useEffect(() => {
    // console.log(dashboardData);
  }, [dashboardData]);
  useEffect(()=>{
    console.log(revenueData);
    console.log(expensesData)    
  },[revenueData,expensesData])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await API.get("/dashboard");
        setDashboardData(response.data);
        setRevenueData(response.data.revenueData.reveData);
        setExpensesData(response.data.expensesData.expenseData);
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
              <LineChart revenueData={revenueData} expensesData={expensesData} />
            </div>
            <div className="w-full bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-white">
                  Staff Members
                </h1>
                <span className="text-sm text-gray-300">
                  {dashboardData.staffData.staffNames.length} Active
                </span>
              </div>
              <hr className="mb-6 border-gray-700" />
              <div className="space-y-4">
                {dashboardData.staffData.staffNames.map((name, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md border border-gray-600"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-semibold shadow-md relative">
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 rounded-full opacity-20"></span>
                        {name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{name}</h3>
                        <p className="text-sm text-gray-300">Staff Member</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-900 text-white border border-gray-600">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <hr className="mt-10" />
          <section className="flex  flex-col gap-1 w-fit">
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
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
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
                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                }
              />{" "}
            </div>
            <div className="grid grid-cols-1 gap-4 p-4">
              <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-blue-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Room Statistics</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">Total Rooms</p>
                      <p className="text-2xl font-bold text-blue-600">{dashboardData.roomData.totalRooms}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">Occupied Rooms</p>
                      <p className="text-2xl font-bold text-green-600">{dashboardData.roomData.occupiedRooms}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">Available Rooms</p>
                      <p className="text-2xl font-bold text-yellow-600">{dashboardData.roomData.availableRooms}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">Active Assignments</p>
                      <p className="text-2xl font-bold text-purple-600">{dashboardData.roomData.activeAssignments}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-600 text-sm">InActive Assignments</p>
                      <p className="text-2xl font-bold text-red-600">{dashboardData.roomData.inActiveAssignments}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>          </section>
          {/* <BarChart/> */}
        </div>
      ) : null}
    </>
  );
}

export default AdminDashboard;
