import React from "react";
import {
  BanknotesIcon,
  ChartBarSquareIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/solid";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

function InfoContainer({ value, title }) {
  let icon;
  let bgColor;

  switch (title) {
    case "Net Profit":
      icon = <BanknotesIcon className="h-8 w-8" />;
      bgColor = "bg-green-500";
      break;
    case "Expense":
      icon = <ArrowDownTrayIcon className="h-8 w-8" />;
      bgColor = "bg-red-500";
      break;
    case "Revenue":
      icon = <ChartBarSquareIcon className="h-8 w-8" />;
      bgColor = "bg-blue-500";
      break;
    default:
      icon = null;
      bgColor = "bg-gray-500";
  }

  return (
    <div
      className={`relative w-60 h-32 rounded-xl p-4 m-2 ${bgColor} text-white shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105`}
    >
      <div className="absolute inset-0 bg-white opacity-10 animate-shimmer transform -skew-x-12"></div>
      <div className="absolute top-2 right-2 flex items-center justify-center opacity-20 hover:opacity-50 transition-all duration-1000">
        <CurrencyDollarIcon className="h-20 w-20 text-white" />
      </div>
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex justify-between items-center">
          <span className="opacity-80">{icon}</span>
          <p className="text-3xl font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{value}</p>
        </div>
        <p className="text-sm font-medium tracking-wider mt-1">{title}</p>
      </div>
    </div>
  );
}

export default InfoContainer;