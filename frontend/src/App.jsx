import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import all pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Verify from './pages/Verify'; // **CHANGED: Import the new Verify page**

// Import shared components
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

/**
 * A simple Layout component that wraps its children with the
 * common UI elements like Navbar, SearchBar, and Footer.
 */
const Layout = ({ children }) => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <SearchBar />
      <main className="min-h-[70vh]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Route for the Login page (does NOT use the Layout) */}
      <Route path="/login" element={<Login />} />

      {/* Routes that DO use the shared Layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/collection" element={<Layout><Collection /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      <Route path="/cart" element={<Layout><Cart /></Layout>} />
      <Route path="/orders" element={<Layout><Orders /></Layout>} />
      <Route path="/place-order" element={<Layout><PlaceOrder /></Layout>} />
      <Route path="/product/:productId" element={<Layout><Product /></Layout>} />
      
      {/* **CHANGED: Added the route for payment verification** */}
      <Route path="/verify" element={<Layout><Verify /></Layout>} />
    </Routes>
  );
};

export default App;
