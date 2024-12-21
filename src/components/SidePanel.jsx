import React from "react";
import { Link, useLocation } from "react-router-dom";

function SidePanel({options}) {
  const location = useLocation(); // To track current active route

  return (
    <>
      <div className="flex items-start">
        <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8">
          <div
            id="sidebar-collapse-menu"
            style={{ height: "calc(100vh - 72px)" }}
            className="bg-white shadow-lg h-screen fixed py-6 px-4 top-[70px] left-0 overflow-auto z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500"
          > 
            <div className="mt-6">
              <ul className="mt-3 space-y-2">
                {options.map((option, index) => (
                  <Link 
                    key={index} 
                    to={option.link}
                    className={`block transition-all duration-300 ${
                      location.pathname === option.link 
                        ? 'bg-green-100' 
                        : ''
                    }`}
                  >
                    <li className="transform transition-transform duration-200 hover:translate-x-1">
                      <span className={`text-gray-800 text-sm flex items-center rounded-md px-4 py-2 transition-all duration-300
                        hover:bg-green-50 hover:text-green-600
                        ${location.pathname === option.link 
                          ? 'bg-green-100 text-green-700' 
                          : ''
                        }`}
                      >
                        <span>{option.name}</span>
                      </span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default SidePanel;
