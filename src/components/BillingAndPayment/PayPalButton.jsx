import React, { useEffect, useState, useMemo } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
const PayPalButton = ({ invoiceDetails }) => {
  const [payment, setPayment] = useState({});
  const residentId = useMemo(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return userData ? userData.userid : "id not found";
  }, []);
  useEffect(() => {
    setPayment({
      residentId,
      invoiceDetails,
    });
  }, [invoiceDetails]);

  //checkout the resident and update revenue
  const checkoutAndUpdateRevenue = async () => {
    try {
      await API.post("/checkoutAndUpdateRevenue", payment)
        .then((res) => {
          console.log(res);
          toast.success("Checkout and revenue update successful");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to update checkout and revenue");
        });
    } catch (error) {
      console.log(error);
      toast.error("Error during checkout process");
    }
  };

  const createBilling = async () => {
    try {
      await API.post("/create-billing", {
        invoiceNumber: invoiceDetails.invoiceNumber,
        residentId: residentId,
        roomNumber: invoiceDetails.roomNumber,
        roomFee: invoiceDetails.roomfees,
        utilities: 150,
        additionalServices: 200,
        discount: 0,
        lateFee: 0,
        billingAmount: invoiceDetails.total,
        paymentStatus: "Paid",
        invoiceDetails: invoiceDetails,
      })
        .then((res) => {
          console.log(res);
          toast.success("Billing created successfully");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to create billing");
        });
    } catch (error) {
      console.log(error);
      toast.error("Error creating billing");
    }
  };

  const navigate = useNavigate();
  if (!invoiceDetails || !invoiceDetails.total) {
    console.error("Invalid invoice details:", invoiceDetails);
    alert("Invalid invoice data provided.");
    return null;
  }

  // Extract and prepare data
  const {
    invoiceNumber,
    username,
    roomfees,
    washing,
    electricity,
    water,
    internet,
    maintenance,
    cleaning,
    subTotal,
    tax,
    total,
  } = invoiceDetails;

  // Map data to PayPal items
  const items = [
    { name: "Room Fees", amount: roomfees },
    { name: "Washing", amount: washing },
    { name: "Electricity", amount: electricity },
    { name: "Water", amount: water },
    { name: "Internet", amount: internet },
    { name: "Maintenance", amount: maintenance },
    { name: "Cleaning", amount: cleaning },
  ].filter((item) => item.amount > 0); // Exclude items with zero amounts

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "ATLz5XdXtthAoUYZ4SEnhkJ8Oz6-o0qkI9FTv9SzA3NCjbisg-r-fuVx7On8_XeBpT4IdhC2O0VbLPun", // Replace with your actual PayPal client ID
        currency: "USD", // Set currency to match your data
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(_, actions) => {
          try {
            // Construct PayPal purchase units
            return actions.order.create({
              purchase_units: [
                {
                  description: `Invoice: ${invoiceNumber} for ${username}`,
                  amount: {
                    currency_code: "USD",
                    value: total.toFixed(2).toString(),
                    breakdown: {
                      item_total: {
                        currency_code: "USD",
                        value: subTotal.toFixed(2).toString(),
                      },
                      tax_total: {
                        currency_code: "USD",
                        value: tax.toFixed(2).toString(),
                      },
                    },
                  },
                  items: items.map((item) => ({
                    name: item.name,
                    unit_amount: {
                      currency_code: "USD",
                      value: item.amount.toFixed(2).toString(),
                    },
                    quantity: "1",
                  })),
                },
              ],
            });
          } catch (error) {
            console.error("Error creating order:", error);
            toast.error("An error occurred while creating the order");
            return Promise.reject(error);
          }
        }}
        onApprove={async (_, actions) => {
          try {
            const details = await actions.order.capture();
            const payerName = details?.payer?.name?.given_name || "Customer";
            toast.success(`Payment successful! Thank you for your payment, ${payerName}`);
            {
              setTimeout(() => {
                navigate("/resident");
              }, 3000);
            }
            checkoutAndUpdateRevenue();
            createBilling();
            console.log("Payment Details:",payerName, details);
          } catch (error) {
            console.error("PayPal Capture Error:", error);
            toast.error("An error occurred while capturing the payment");
          }
        }}
        onError={(err) => {
          console.error("PayPal Checkout Error:", err);
          toast.error("There was an error processing your payment");
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;