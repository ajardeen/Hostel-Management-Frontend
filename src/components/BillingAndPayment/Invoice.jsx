import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import logo from "../../assets/hosteledge logo.png";
import PayPalButton from "./PayPalButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Invoice = ({ residentId }) => {
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();
 

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
  }, [residentId]);

  return (
    <>
    {!invoiceData ? (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500">No Data</div>
      </div>
    ) : (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img className="h-6 w-6 mr-1" src={logo} alt="Logo" />
          <div className="text-gray-700 font-bold">HosteLedge</div>
        </div>
        <div className="text-gray-700">
          <div className="font-bold text-base">INVOICE</div>
          <div className="text-xs">
            Date: {new Date(invoiceData.invoiceDate).toLocaleDateString()}
          </div>
          <div className="text-xs">#{invoiceData.invoiceNumber}</div>
        </div>
      </div>

      {/* Hostel and Resident Information */}
      <div className="flex justify-between gap-4 text-sm mb-4">
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
      <table className="w-full text-sm mb-4">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Description</th>
            <th className="py-2 text-right pr-4">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2">Room Fees</td>
            <td className="py-2 text-right pr-4">${invoiceData.roomfees}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Room occupied</td>
            <td className="py-2 text-right pr-4">{invoiceData.occupied}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Washing</td>
            <td className="py-2 text-right pr-4">${invoiceData.washing}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Electricity</td>
            <td className="py-2 text-right pr-4">${invoiceData.electricity}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Water</td>
            <td className="py-2 text-right pr-4">${invoiceData.water}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Internet</td>
            <td className="py-2 text-right pr-4">${invoiceData.internet}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Maintenance</td>
            <td className="py-2 text-right pr-4">${invoiceData.maintenance}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">Cleaning</td>
            <td className="py-2 text-right pr-4">${invoiceData.cleaning}</td>
          </tr>
        </tbody>
      </table>
      {/* Totals */}
      <div className="text-sm">
        <div className="flex justify-end  gap-2 py-1">
          <span>Subtotal:</span>
          <span>${invoiceData.subTotal}</span>
        </div>
        <div className="flex justify-end gap-2 py-1">
          <span>Tax 10% :</span>
          <span>${invoiceData.tax}</span>
        </div>
        <div className="flex justify-end gap-2 py-1 font-bold">
          <span>Total:</span>
          <span>${invoiceData.total}</span>
        </div>
      </div>
      <div className="flex justify-center mt-8 items-center">
        <div className="flex justify-center mt-8 items-center">
        <PayPalButton invoiceDetails={invoiceData} />
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-xs text-gray-700 mt-4">
        <div>
          Payment is due within 30 days. Late payments are subject to a 5% fee.
        </div>
        <div>Queries: billing@hosteledge.com</div>
        <div>Thank you for staying with HosteLedge!</div>
      </div>
      <ToastContainer />
    </div>
    )}
    </>
  );
};

export default Invoice;