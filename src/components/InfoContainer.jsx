import React from "react";

function InfoContainer({ value, title, icon }) {
  return (
    <div
      className={`relative w-48 h-36 border flex rounded-lg p-4 m-2 bg-gradient-to-br from-indigo-600 to-purple-500 text-white shadow-lg hover:shadow-xl hover:transform hover:-translate-y-1 transition-all duration-300`}
    >
      <div className="flex flex-col justify-between w-full">
        <div className="flex justify-between items-start">
          <span className="text-3xl opacity-80">{icon}</span>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <p className="text-lg font-medium uppercase tracking-wider mt-2">{title}</p>
      </div>
    </div>
  );
}

export default InfoContainer;