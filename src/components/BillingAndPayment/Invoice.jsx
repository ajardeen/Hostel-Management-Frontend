import React from "react";
import logo from "../../assets/hosteledge logo.png";

const Invoice = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <img
            className="h-8 w-8 mr-1"
            src={logo}
            alt="Logo"
          />
          <div className="text-gray-700 font-bold text-lg">
           HosteLedge
          </div>
        </div>
        <div className="text-gray-700">
          <div className="font-bold text-xl mb-2">INVOICE</div>
          <div className="text-sm">Date: 01/05/2023</div>
          <div className="text-sm">Invoice #: INV12345</div>
        </div>
      </div>

      {/* Billing Information */}
      <div className="border-b-2 border-gray-300 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
        <div className="text-gray-700 mb-2">John Doe</div>
        <div className="text-gray-700 mb-2">123 Main St.</div>
        <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
        <div className="text-gray-700">johndoe@example.com</div>
      </div>

      {/* Items Table */}
      <table className="w-full text-left mb-8">
        <thead>
          <tr>
            <th className="text-gray-700 font-bold uppercase py-2">
              Description
            </th>
            <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
            <th className="text-gray-700 font-bold uppercase py-2">Price</th>
            <th className="text-gray-700 font-bold uppercase py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-4 text-gray-700">Product 1</td>
            <td className="py-4 text-gray-700">1</td>
            <td className="py-4 text-gray-700">$100.00</td>
            <td className="py-4 text-gray-700">$100.00</td>
          </tr>
          <tr>
            <td className="py-4 text-gray-700">Product 2</td>
            <td className="py-4 text-gray-700">2</td>
            <td className="py-4 text-gray-700">$50.00</td>
            <td className="py-4 text-gray-700">$100.00</td>
          </tr>
          <tr>
            <td className="py-4 text-gray-700">Product 3</td>
            <td className="py-4 text-gray-700">3</td>
            <td className="py-4 text-gray-700">$75.00</td>
            <td className="py-4 text-gray-700">$225.00</td>
          </tr>
        </tbody>
      </table>

      {/* Subtotal */}
      <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Subtotal:</div>
        <div className="text-gray-700">$425.00</div>
      </div>

      {/* Tax */}
      <div className="text-right mb-8">
        <div className="text-gray-700 mr-2">Tax:</div>
        <div className="text-gray-700">$25.50</div>
      </div>

      {/* Total */}
      <div className="flex justify-end mb-8">
        <div className="text-gray-700 mr-2">Total:</div>
        <div className="text-gray-700 font-bold text-xl">$450.50</div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-gray-300 pt-8 mb-8">
        <div className="text-gray-700 mb-2">
          Payment is due within 30 days. Late payments are subject to fees.
        </div>
        <div className="text-gray-700 mb-2">
          Please make checks payable to Your Company Name and mail to:
        </div>
        <div className="text-gray-700">123 Main St., Anytown, USA 12345</div>
      </div>
    </div>
  );
};

export default Invoice;
