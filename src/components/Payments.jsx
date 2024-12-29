import React, { useState, useEffect } from 'react';
import API from '../api/axios'

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [numberOfPayments, setNumberOfPayments] = useState(0);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await API.get('getAllPayments');
        setPayments(response.data.payments);
        setTotalPayments(response.data.totalPayments);
        setNumberOfPayments(response.data.numberOfPayments);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };
    fetchPayments();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Payment</h1>
          <p className="text-sm text-gray-500 mt-1">
            This page show you Payment information
          </p>
        </div>

        {/* My Plan Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Pays</h2>
            <div className="flex items-center justify-between border rounded-lg p-4 mt-2">
              <div>
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-600 text-sm font-medium px-2 py-1 rounded">
                    Pro
                  </span>
                  <span className="ml-3 text-sm text-gray-600">Payment Received</span>
                </div>
                <p className="text-lg font-bold text-gray-800 mt-1">${totalPayments.toFixed(2)} USD</p>
                <p className="text-sm text-gray-500 mt-1">
                  (2024 year - 2025 year)
                </p>
              </div>
              <div>
                <button className="text-blue-600 font-medium text-sm hover:underline">
                  Details
                </button>
                <button className="ml-4 text-blue-600 font-medium text-sm hover:underline">
                  More
                </button>
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Payment Method</h2>
            <div className="border rounded-lg p-4 mt-2 flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <img
                    src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                    alt="PayPal"
                    className="w-8 h-8"
                  />
                  <p className="ml-3 text-gray-800 font-medium">hosteledge@edge.com</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">Expiry 08/2025</p>
              </div>
              <button className="text-blue-600 font-medium text-sm hover:underline">
                Change
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Notes: Please be careful on choosing your payment method, because we will
              automatically cut your balance.
            </p>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700">Payment History ({numberOfPayments})</h2>
          <p className="text-sm text-gray-500 mt-1">
            See history of your payment plan invoice
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Payment Invoice
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-800">{item.invoiceNumber}</td>
                    <td className="py-3 px-4 text-gray-800">${item.billingAmount.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-800">{item.billingDate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${
                          item.paymentStatus === 'Paid'
                            ? 'bg-green-100 text-green-600'
                            : item.paymentStatus === 'Pending'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {item.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 font-medium text-sm hover:underline">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded">
            Download All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;