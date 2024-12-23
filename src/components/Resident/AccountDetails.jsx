import { useState, useEffect } from "react";
import API from "../../api/axios";
import {
  Cog6ToothIcon,
  CreditCardIcon,
  UserIcon,
  ArrowDownTrayIcon,
  Squares2X2Icon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountDetails({ residentId ,role}) {
  const [isEditing, setIsEditing] = useState(false);
  const [accountDetails, setAccountDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    emergencyContact: "",
    CheckInDate: "",
    CheckOutDate: "",
    email: "",
    role: "",
  });


  // Fetch the account details from the API to update the account details
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you can add API call to update the details
    const updateAccountDetails = async () => {
      try {
        const id = residentId;
        
        API.put("/updateaccount/" + id,{accountDetails}).then((res) => {
          console.log(res.data);
          toast.success("Successfully Updated Account Details");
        });
      } catch (error) {
        console.log(error);
        toast.success("Update failed");
      }
    };
    updateAccountDetails();
  };
  useEffect(() => {
    try {
      API
        .get(`/useraccountdetails/${residentId}`)
        .then((res) => {
          console.log(res.data);
          setAccountDetails(res.data.accountDetails);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Handle input change event to update the account details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex-1 p-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b relative">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full"
          >
            <PencilIcon className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Account Details</h2>
          <p className="text-sm text-gray-500">Manage your Hostel Profile</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Account Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={accountDetails.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={accountDetails.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={accountDetails.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={accountDetails.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={accountDetails.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={accountDetails.emergencyContact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly={!isEditing}
                />
              </div>
              {role === "admin"?null:<><div className="space-y-2">
                <label className="block text-sm font-medium">
                  Check In Date
                </label>
                <input
                  type="date"
                  name="CheckInDate"
                  value={accountDetails.CheckInDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Check Out Date
                </label>
                <input
                  type="date"
                  name="CheckOutDate"
                  value={accountDetails.CheckOutDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly={!isEditing}
                />
              </div></>}
              
              <div className="space-y-2">
                <label className="block text-sm font-medium">Role</label>
                <input
                  type="text"
                  name="role"
                  value={accountDetails.role}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md bg-gray-50"
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-end">
              {isEditing && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update
                </button>
              )}
            </div>

            <div className="pt-6 border-t">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
              >
                Delete Account
              </button>
            </div>
          </div>
        </form>{" "}
      </div>
      <ToastContainer />
    </div>
  );
}
