import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import logo from "../../assets/hosteledge logo.png";

const Invoice = ({ residentId }) => {
  const [invoiceData, setInvoiceData] = useState({});
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        const response = await API.get(`/resident/invoice/${residentId}`);
        setInvoiceData(response.data.invoiceDetails);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
        navigate("/resident");
      }
    };

    if (residentId) {
      fetchInvoiceData();
    } else {
      navigate("/resident");
    }
  }, [residentId, api, navigate]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img className="h-6 w-6 mr-1" src={logo} alt="Logo" />
          <div className="text-gray-700 font-bold">HosteLedge</div>
        </div>
        <div className="text-gray-700">
          <div className="font-bold text-base">INVOICE</div>
          <div className="text-xs">Date: {new Date(invoiceData.invoiceDate).toLocaleDateString()}</div>
          <div className="text-xs">#{invoiceData.invoiceNumber}</div>
        </div>
      </div>

      {/* Hostel and Resident Information */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          <h2 className="font-bold mb-1">Hostel Details:</h2>
          <div className="text-gray-700">HosteLedge</div>
          <div className="text-gray-700">123 Hostel Street</div>
          <div className="text-gray-700">support@hosteledge.com</div>
        </div>
        <div>
          <h2 className="font-bold mb-1">Bill To:</h2>
          <div className="text-gray-700">{invoiceData.username}</div>
          <div className="text-gray-700">Room: {invoiceData.roomNumber}</div>
          <div className="text-gray-700">{invoiceData.email}</div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full text-left text-sm mb-4">
        <thead>
          <tr className="border-b">
            <th className="py-1">Description</th>
            <th className="py-1">Amount</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Room Fees', invoiceData.roomfees],
            ['Washing', invoiceData.washing],
            ['Electricity', invoiceData.electricity],
            ['Water', invoiceData.water],
            ['Internet', invoiceData.internet],
            ['Maintenance', invoiceData.maintenance],
            ['Cleaning', invoiceData.cleaning],
          ].map(([desc, amount]) => (
            <tr key={desc} className="border-b">
              <td className="py-1">{desc}</td>
              <td className="py-1">₹{amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="text-sm">
        <div className="flex justify-between py-1">
          <span>Subtotal:</span>
          <span>₹{invoiceData.subTotal}</span>
        </div>
        <div className="flex justify-between py-1">
          <span>Tax:</span>
          <span>₹{invoiceData.tax}</span>
        </div>
        <div className="flex justify-between py-1 font-bold">
          <span>Total:</span>
          <span>₹{invoiceData.total}</span>
        </div>
      </div>
      <div className="flex justify-center mt-8 items-center">
        <button
          onClick={() => navigate(`/resident/payment/${residentId}`)}
          className="inline-flex w-full justify-center items-center px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          PayNow : ₹{invoiceData.total}
        </button>
      </div>

      {/* Footer */}
      <div className="text-xs text-gray-700 mt-4">
        <div>Payment is due within 30 days. Late payments are subject to a 5% fee.</div>
        <div>Queries: billing@hosteledge.com</div>
        <div>Thank you for staying with HosteLedge!</div>
      </div>
    </div>
  );
};

export default Invoice;
