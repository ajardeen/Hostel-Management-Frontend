import React, { useState } from 'react'
import API from '../api/axios'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function RegisterExpense() {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    description: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { category, amount, date, description } = formData
    console.log({ category, amount, date, description });
    
    try {
      const response = await API.post('/maintenance/register-expense', { category, amount, date, description })
      if(response.status === 201) {
        toast.success('Expense registered successfully')
      } else {
        toast.error('Failed to register expense')
      }
      console.log('Expense registered:', response.data)
      setFormData({
        category: '',
        amount: '',
        date: '',
        description: ''
      })
    } catch (error) {
      console.error('Error registering expense:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Register New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter expense category"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter expense description"
            rows="3"
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-1.5 px-3 text-sm rounded-md hover:bg-blue-700"
        >
          Register Expense
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default RegisterExpense