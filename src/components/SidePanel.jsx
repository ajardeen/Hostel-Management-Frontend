import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";
import logotext from "../assets/hosteledge logo.png";
import logo from "../assets/hosteledge logo text.png";
function SidePanel({ options, username, useremail }) {
  const location = useLocation();
  const { role, logout } = useAuth();
  const accountUrl = `/${role}/account`;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center h-[47rem] bg-[#f5f7f9] rounded-tl-3xl">
       <div className="flex-shrink-0 justify-center items-center mt-2 rounded-tl-3xl">
          <span className="flex justify-center items-center  bg-gradient-to-r from-green-200 to-[#f5f7f9] rounded-lg px-4 py-1">
            <img className="w-auto h-8 lg:h-10" src={logotext} alt="Logo" />
            <img className="w-auto h-8 lg:h-8" src={logo} alt="Logo" />
          </span>
        </div>

      <nav
        id="sidebar"
        className="w-[250px] h-full bg-[#f5f7f9]  flex flex-col rounded-tl-3xl "
      >
        {/* User Info Section */}
        <div className="flex items-center space-x-3 px-6 py-4 border-b border-gray-200 rounded-tl-lg ">
          <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center  text-gray-500 font-bold">
            US
          </div>
          <div>
            <h3 className="text-gray-800 font-semibold">{username}</h3>
            <p className="text-sm text-gray-500">{useremail}</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-2 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Menu Options */}
        <div className="flex-grow overflow-y-auto">
          <h3 className="text-start  text-blue-500 p-1 pl-10 font-bold text-lg">Menu</h3>
          <div className="border-2 border-blue-500 ml-1"></div>
          <ul className="mt-2 space-y-1">
            {filteredOptions.map((option, index) => (
              <Link key={index} to={option.link}>
                <li
                  className={`flex items-center px-4 py-2 my-2 text-sm font-medium rounded-lg transition
                    ${
                      location.pathname === option.link
                        ? "bg-white text-gray-900 shadow-lg  ml-2"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-md"
                    }`}
                >
                  <span className="h-5 w-5 text-gray-500">{option.icon}</span>
                  <span className="ml-4">{option.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
       
        {/* Account and Logout Section */}
        <div className="px-6 py-4 border-t border-gray-200">
          <ul className="space-y-1">
            {/* Account Link */}
            <Link to={accountUrl}>
              <li
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition
                  ${
                    location.pathname === "/account"
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span className="h-5 w-5 text-gray-500">
                  {/* Account Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A12.066 12.066 0 0112 15c2.486 0 4.813.755 6.879 2.038M15 9a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                <span className="ml-4">Account</span>
              </li>
            </Link>

            {/* Logout Link */}
            <Link to="/">
              <li
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition
                  text-red-600 hover:bg-red-50 hover:text-red-800`}
                onClick={logout}
              >
                <span className="h-5 w-5 text-red-500">
                  {/* Logout Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 4a4 4 0 01-8 0"
                    />
                  </svg>
                </span>
                <span className="ml-4">Logout</span>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
      
    </div>
  );
}

export default SidePanel;