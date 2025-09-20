import React, { useState } from 'react'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL  // 👈 cleaner

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${backendUrl}/api/user/admin`,
        { email, password }
      )

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        alert(response.data.message)
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error(error)
      alert('Error logging in. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg px-8 py-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Panel
        </h1>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Email Address</p>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 mt-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
