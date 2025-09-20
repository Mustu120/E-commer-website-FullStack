import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';

// Import react-toastify for notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // Get backend URL from environment variables
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  // Initialize token state directly from localStorage, fallback to empty string
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // This effect runs whenever the 'token' state changes
  useEffect(() => {
    // If the token is truthy (user is logged in), save it to localStorage.
    // If the token is falsy (user logged out), remove it from localStorage.
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]); // The effect depends on the 'token' value

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* ToastContainer must be at the top level to display notifications */}
      <ToastContainer />

      {!token ? (
        <Login setToken={setToken} url={backendUrl} />
      ) : (
        <>
          {/* Pass setToken to Navbar for logout functionality */}
          <Navbar setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='flex-grow p-8'>
              <Routes>
                {/* Pass token prop for authenticated API requests */}
                <Route path='/add' element={<Add url={backendUrl} token={token} />} />
                <Route path='/list' element={<List url={backendUrl} token={token} />} />
                <Route path='/orders' element={<Orders url={backendUrl} token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

